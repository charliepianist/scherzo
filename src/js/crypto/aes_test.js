goog.module('scherzo.crypto.aesTest');
goog.setTestOnly();

goog.require('goog.testing.asserts');
const testSuite = goog.require('goog.testing.testSuite');
const AES = goog.require('scherzo.crypto.aes');
const KEY = '6c6554dd55fadb0792fd638c86130d3a8d481edb350783e525111377afc78a33';
const MESSAGES = ['', 'awef87awgiufe', 'hello world'];

testSuite({
    testAes_encryptDecryptYieldsOriginalMessage() {
        let aes = new AES(KEY);
        for(let message of MESSAGES) {
            let ciphertext = aes.encrypt(message);
            assertEquals('Message "' + message + '" should yield itself after encrypting then decrypting.',
                message, aes.decrypt(ciphertext));
        }
    },

    testAes_twoObjectsWithSameKey_shouldDecryptEachOthersCiphertextsToOriginalMessage() {
        let aes1 = new AES(KEY);
        let aes2 = new AES(KEY);
        for(let message of MESSAGES) {
            let ct1 = aes1.encrypt(message);
            let ct2 = aes2.encrypt(message);

            assertEquals('Message "' + message + '" should yield itself after encrypting with one AES object and decrypting with another.',
                message, aes1.decrypt(ct2));
            assertEquals('Message "' + message + '" should yield itself after encrypting with one AES object and decrypting with another.',
                message, aes2.decrypt(ct1));
        }
    },

    testAes_decrypt_givenMessageEncryptedWithWrongKey_shouldReturnNull() {
        let aesMalicious = new AES('badKey');
        let aes = new AES(KEY);

        for(let message of MESSAGES) {
            let badCiphertext = aesMalicious.encrypt(message);
            assertNull('AES should return null if given a message ("' + message + '") that used a different key.',
                aes.decrypt(badCiphertext));
        }
    },

    testAes_decrypt_givenInvalidOrIncompleteJSON_shouldReturnNull() {
        let invalidInputs = ['', 'e:w}oa"8f{7g"b3}jf', '{ "hello": "goodbye" }', '{}',
            '{ "ct": "malicious" }', '[2, 3, 4]'];
        let aes = new AES(KEY);

        for(let invalidInput of invalidInputs) {
            assertNull('AES should return null if given an invalid or incomplete JSON ("' + invalidInput + '").',
                aes.decrypt(invalidInput));
        }
    },
});