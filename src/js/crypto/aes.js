/**
 * @fileoverview
 * 
 * A file containing wrapper/helper methods for encryption/decryption of data.
 */

goog.module('scherzo.crypto.aes');

const SJCL = goog.require('sjcl');

exports = class {
    /**
     * @param {string} key The secret key used for encryption/decryption
     */
    constructor(key) {
        /** @type {string} */
        this._key = key;
    }

    /**
     * Encrypts a message using this object's secret key, and returns the ciphertext
     * (along with info needed to decrypt)
     * 
     * @suppress {checkTypes} encrypt supposedly needs 4 inputs, but works with 2
     * @param {string} message The message to be encrypted
     * @returns {string} JSON string with ciphertext and the fields needed to decrypt it
     */
    encrypt(message) {
        return SJCL.encrypt(this._key, message);
    }

    /**
     * Tries to decrypt a message using this object's secret key. Returns null if
     * failed to decrypt.
     * 
     * @suppress {checkTypes} decrypt supposedly needs 4 inputs, but works with 2
     * @param {string} ciphertext The JSON of the ciphertext + fields needed to decrypt
     * @returns {string | null} The decrypted message, or null if decryption failed.
     */
    decrypt(ciphertext) {
        try {
            return SJCL.decrypt(this._key, ciphertext);
        } catch(e) {
            console.log(e); // For future debugging
            return null;
        }
    }
}