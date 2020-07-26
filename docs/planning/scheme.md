## Scheme
Sequence of steps in communication scheme
1. Alice (first person to initialize scherzo) clicks button, sends (signature or hash) to Bob
2. Bob initializes scherzo (auto-detect and show popup?) to verify Alice's identity, sends (signature or hash) back
3. Alice and Bob key exchange (Alice will send, then Bob will reply)
4. Everything thereafter uses that key, prepend messages with some indicator of encryption
    1. Store hashmap of Strings (part of URL) to secret keys
    2. Encrypt things, prepend indicator
    3. Decrypt things with that indicator, otherwise don't do anything

### Cryptographic Details
1. Initial verification will use an initial implementation of a simple hash function and verification via hash.
2. ECDH for key exchange
3. AES encryption/decryption

### Normal Behavior
- Alice clicks "On", sends signature (signature = reset message) to Bob
- Bob's scherzo auto-detects and shows a popup
- Bob initializes scherzo, sends back a signature
- Alice sends her public key across
- Bob sends his public key across
- Alice and Bob both derive the shared secret key
- Encryption/Decryption Phase
    - Any message Alice or Bob sends is encrypted before being sent
    - Any message from _either Alice or Bob_ (with the prefix) will be decrypted and an overlay will be placed on the page with the decrypted message.


### Error handling
#### General
- First level of safeguard: A prefix to every message sent by the extension
- On/Off switch to determine whether to encrypt/decrypt stuff 
    - Reset message (deterministic, but should generally differ every time)
        - This can be the same as the initial signature that [auth.js](../../src/js/crypto/auth.js) implements
        - Sent when "On" pressed and a shared secret key not present, or when manual reset forced
        - Indicates to the other party that this party is about to begin the auth process from scratch
- Failure message (referenced in Key Exchange/Encryption and Decryption sections of Specific Errors)
    - Indicate to both parties to reset to Off and the side that raised the issue will indicate why, the other side will simply say that that side encountered an error, please try again

#### Specific Errors
- Signature
    - Incorrect or missing -> do nothing, but keep listening.
- Key Exchange
    - Either party receives message missing this extension's prefix -> ignore and keep listening
    - Either party receives message that leads to invalid or failed shared key generation -> Send failure message to the other party, reset to Off, and notify that generation of encryption key failed. 
    - Either party receives failure message -> reset to Off, notify that generation of encryption key failed.
- Encryption/Decryption
    - Key cannot be found -> Send failure message and reset to Off/notify that key was lost
    - Receive message that doesn't have prefix -> Ignore and keep listening
    - Receive message that has prefix but is not a valid encryption -> Ignore and keep listening
    - Receive message that has prefix but was encrypted using a different key -> Overlay with "Your encryption keys don't match! Please reset to sync up your keys."