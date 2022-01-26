#include <napi.h>
// #include <openssl/sha.h>
#include <CoreFoundation/CoreFoundation.h>
#include <CommonCrypto/CommonCrypto.h>
#include <Security/Security.h>

namespace {

using namespace Napi;

typedef std::function<bool(SecCertificateRef)> CertificatePredicate;

template <typename T>
class CFPointer
{
  T value;

public:
  CFPointer(T val) : value(val)
  {
    CFTypeRef value_must_be_a_CFTypeRef = val;
  }

  CFPointer(const CFPointer &) = delete;
  CFPointer &operator=(const CFPointer &) = delete;
  CFPointer(CFPointer &&reference)
  {
    value = reference.value;
    reference.value = nullptr;
  }
  CFPointer &operator=(CFPointer &&reference)
  {
    if (value != nullptr)
    {
      CFRelease(value);
    }
    value = reference.value;
    reference.value = nullptr;
    return *this;
  }

  ~CFPointer()
  {
    if (value != nullptr)
    {
      CFRelease(value);
    }
  }
  T get() { return value; }
};

const char *getSecErrorString(OSStatus status)
{
  return CFStringGetCStringPtr(SecCopyErrorMessageString(status, NULL), kCFStringEncodingUTF8);
}

void failOnError(OSStatus status, Env env, const char *error)
{
  if (status != errSecSuccess)
  {
    char msg[256];
    snprintf(msg, sizeof(msg), "%s: %s", error, getSecErrorString(status));
    throw Error::New(env, msg);
  }
}

bool isMatchingCertificate(std::string subject, const SecCertificateRef certificate)
{
  CFPointer<CFStringRef> certSubject(SecCertificateCopySubjectSummary(certificate));
  const char *subj = CFStringGetCStringPtr(certSubject.get(), kCFStringEncodingUTF8);
  if (subj && subj == subject)
  {
    return true;
  }
  return false;
}

bool isMatchingCertificate(std::vector<uint8_t> thumbprint, const SecCertificateRef certificate)
{
  CFPointer<CFDataRef> certData(SecCertificateCopyData(certificate));

  uint8_t *hashPtr = nullptr;
  if (thumbprint.size() == CC_SHA1_DIGEST_LENGTH)
  {
    uint8_t shaHash[CC_SHA1_DIGEST_LENGTH];
    hashPtr = CC_SHA1(CFDataGetBytePtr(certData.get()), CFDataGetLength(certData.get()), shaHash);
  }
  else if (thumbprint.size() == CC_SHA256_DIGEST_LENGTH)
  {
    uint8_t shaHash[CC_SHA256_DIGEST_LENGTH];
    hashPtr = CC_SHA256(CFDataGetBytePtr(certData.get()), CFDataGetLength(certData.get()), shaHash);
  }
  else
  {
    return false;
  }

  return memcmp(&thumbprint[0], hashPtr, thumbprint.size()) == 0;
}

CFMutableDictionaryRef createQueryDictionary()
{
  CFMutableDictionaryRef dict = CFDictionaryCreateMutable(nullptr, 3, &kCFTypeDictionaryKeyCallBacks, &kCFTypeDictionaryValueCallBacks);
  CFDictionaryAddValue(dict, kSecClass, kSecClassIdentity);
  CFDictionaryAddValue(dict, kSecReturnRef, kCFBooleanTrue);
  CFDictionaryAddValue(dict, kSecMatchLimit, kSecMatchLimitAll);
  return dict;
}

CFPointer<SecIdentityRef> findFirstMatchingIdentity(const Env &env, const CFDictionaryRef &query, const CertificatePredicate &predicate)
{
  CFArrayRef _items = nullptr;
  OSStatus status = SecItemCopyMatching(query, (CFTypeRef *)&_items);
  failOnError(status, env, "SecItemCopyMatching failed to load certificates");
  if (CFGetTypeID(_items) != CFArrayGetTypeID())
  {
    throw Error::New(env, "Expected SecItemCopyMatching to return an array");
  }

  CFPointer<CFArrayRef> items(_items);
  for (CFIndex i = 0; i < CFArrayGetCount(items.get()); i++)
  {
    SecIdentityRef identity = (SecIdentityRef)CFArrayGetValueAtIndex(items.get(), i);
    if (CFGetTypeID(identity) != SecIdentityGetTypeID())
    {
      throw Error::New(env, "Expected SecItemCopyMatching to return SecIdentityRef items");
    }

    SecCertificateRef certRef;
    OSStatus copyCertStatus = SecIdentityCopyCertificate(identity, &certRef);
    failOnError(copyCertStatus, env, "SecIdentityCopyCertificate");
    CFPointer<SecCertificateRef> cert(certRef);

    if (predicate(cert.get()))
    {
      return (SecIdentityRef)CFRetain(identity);
    }
  }

  throw Error::New(env, "Could not find a matching certificate");
}

CFPointer<CFDataRef> extractCertificateAndPrivateKey(const Env &env, const SecIdentityRef &identity, const std::string &passphrase)
{
  CFStringRef pass = CFStringCreateWithCString(nullptr, passphrase.c_str(), kCFStringEncodingUTF8);
  SecItemImportExportKeyParameters params = {
      .passphrase = pass};

  CFDataRef exportData;
  OSStatus status = SecItemExport(
      identity,
      kSecFormatPKCS12,
      0,
      &params,
      &exportData);
  failOnError(status, env, "Failed to export certificate");
  return CFPointer<CFDataRef>(exportData);
}

Value ExportCertificate(const CallbackInfo &args)
{
  Object search_spec = args[0].ToObject();
  std::string passphrase = args[1].ToString().Utf8Value();

  std::function<bool(SecCertificateRef)> predicate;
  if (search_spec.HasOwnProperty("subject"))
  {
    std::string subject_str = search_spec.Get("subject").ToString().Utf8Value();
    CFPointer<CFStringRef> subject(CFStringCreateWithCString(
        nullptr, subject_str.c_str(), kCFStringEncodingUTF8));

    predicate = [subject_str](SecCertificateRef cert) -> bool {
      return isMatchingCertificate(subject_str, cert);
    };
  }
  else
  {
    Buffer<uint8_t> buff = search_spec.Get("thumbprint").As<Buffer<uint8_t>>();
    const uint8_t *data = buff.Data();
    std::vector<uint8_t> thumbprint(data, data + buff.Length());

    predicate = [thumbprint](SecCertificateRef cert) -> bool {
      return isMatchingCertificate(thumbprint, cert);
    };
  }

  // Filtering for kSecAttrLabel and kSecAttrPublicKeyHash does not work as epxected
  // we look for all identities and filter manually
  CFPointer<CFMutableDictionaryRef> query(createQueryDictionary());
  CFPointer<SecIdentityRef> identity(findFirstMatchingIdentity(args.Env(), query.get(), predicate));

  CFPointer<CFDataRef> exportData = extractCertificateAndPrivateKey(args.Env(), identity.get(), passphrase);
  Buffer<uint8_t> exportBuffer = Buffer<uint8_t>::Copy(args.Env(), CFDataGetBytePtr(exportData.get()), CFDataGetLength(exportData.get()));

  return exportBuffer;
}

} // anonymous namespace

static Object InitMacosExportCertificateAndKey(Env env, Object exports)
{
  exports["exportCertificate"] = Function::New(env, ExportCertificate);
  return exports;
}

NODE_API_MODULE(macos_export_certificate_and_key, InitMacosExportCertificateAndKey)
