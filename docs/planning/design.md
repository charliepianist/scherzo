## Design Choices

### High-level Overview
#### Key Exchange
The first step is a key exchange. See [scheme.md](scheme.md) for a description of how this scheme will work. Overall, this step serves to authenticate both parties as users of the extension and derive a shared secret key, used for decryption.

### Cryptography
#### Authentication
"Authentication" is done via hashing some sort of indicator that is accessible by both parties, in order to somewhat verify that this extension has been installed from both ends. This is by no means cryptographically secure, but the choice has been made to ignore such concerns, as this extension is not high-profile enough and can simply be turned off and re-tried if someone, malicious or not, were to trick the extension into thinking the other party has it installed. See [hash.js](../../src/js/crypto/hash.js) for implementation details.

#### Key Exchange
An elliptic curve public key exchange protocol is used, in order to securely derive a shared secret key among both parties with the extension. See [pkc.js](../../src/js/crypto/pkc.js).

#### Encryption
The encryption scheme is secure and a well-established standard (_________), and the shared secret key is stored within Chrome. This, along with the secure Key Exchange protocol, allows for the secret key to be kept completely hidden from the website through which messages are sent.