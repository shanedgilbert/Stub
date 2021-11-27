# macos-export-certificate-and-key
Export a certificate and its corresponding private key from the macOS default keychain. This module is a native addon. It will only successfully work on macOS 10.12+. No prebuilt binaries are currently provided.

This module returns a single certificate and its private key combination as a `.pfx` file, along with a random passphrase that has been used for encrypting the file. It will throw an exception if no relevant certificate could be found. The certificate in question can be specified either through its subject line string or its thumbprint.

When exporting, the user will be prompted to enter his password to allow keychain access.

## Testing
You need to import [`testkeys\certificate.pfx`](./testkeys/certificate.pfx) manually into your local keychain in order for the tests to pass. The password for the file is `pass`.
