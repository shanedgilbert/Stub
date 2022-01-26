const { exportCertificate } = require('bindings')('macos_export_certificate_and_key');
const { randomBytes } = require('crypto');
const util = require('util');

module.exports = function exportCertificateAndPrivateKey({
    subject,
    thumbprint
}) {
  if (!subject && !thumbprint) {
    throw new Error('Need to specify either `subject` or `thumbprint`');
  }
  if (subject && thumbprint) {
    throw new Error('Cannot specify both `subject` and `thumbprint`');
  }
  if (subject && typeof subject !== 'string') {
    throw new Error('`subject` needs to be a string');
  }
  if (thumbprint && !util.types.isUint8Array(thumbprint)) {
    throw new Error('`thumbprint` needs to be a Uint8Array');
  }

  const passphrase = randomBytes(12).toString('hex');
  const pfx = exportCertificate(
    subject ? { subject } : { thumbprint },
    passphrase
  );
  return { passphrase, pfx };
};
