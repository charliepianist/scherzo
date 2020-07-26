## Components
### Crypto
Handles all authentication, key exchange, encryption, and decryption. This component has _only_ those responsibilities; that is, appending a prefix, removing said prefix, or notifying the user of errors (outside of returning values indicating an error) are _not_ the responsibilities of this component.

### MessageProcessor
Exposes ```process``` and ```deprocess``` methods primarily for appending/removing prefixes. 

### MessageReceiver
Raises events when messages are received. _Does not process messages_.

### MessageOverlayer
Finds messages by content and exposes methods to overlay over said messages.

### MessageSendListener
Raises events when messages are about to be sent. Raise an internal event to be caught by MessageHandler, and expose a way to cancel the message (?).

### MessageHandler
Uses MessageListener to listen for messages, then uses Crypto to get state. If appropriate, uses MessageOverlayer to overlay encrypted ciphertexts with the decrypted message (or appropriate error). Also uses MessageSendListener to listen for this side's messages, and if Crypto is at the encryption/decryption state, cancel the message and instead send the encrypted message. Uses MessageProcessor(s) to handle appending/removing prefixes for both listening for and sending messages. When something occurs that should be a failure and thereby turn off the extension, raise an Exception to be caught by the component using this (Scherzo). Expose methods to turn on/off (note turning on/off should deal with the messages) and reset.

### popup.js
Handles interactions with the popup, and exposes methods to show notifications (?).

### Scherzo
Highest-level component, which has a MessageHandler to deal with messages. Handles failures and uses popup.js to show notifications and receive user input.