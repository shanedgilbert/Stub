declare function exportCertificateAndPrivateKey(input: {
  subject: string;
} | {
  thumbprint: Uint8Array;
}): { passphrase: string; pfx: Uint8Array; };
export = exportCertificateAndPrivateKey;