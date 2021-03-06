/**
 * @fileoverview
 * 
 * A file containing the pseudo-authentication scheme used to identify whether users 
 * have this extension. Note that this is far from being cryptographically secure;
 * TODO: replace this with a more secure scheme
 */

goog.module('scherzo.crypto.auth');

const HASH = goog.require('scherzo.crypto.hash');
const CONSTANTS = goog.require('scherzo.util.constants');

/**
 * @type {function(): string}
 */
const DEFUALT_CHAR_PROVIDER = function() {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charsLength = chars.length;
    let index = Math.floor(Math.random() * charsLength);
    return chars.charAt(index);
}

exports.Auth = class {
    /**
     * 
     * @param {(function(): Date)=} dateProvider A function that returns the current date
     * @param {(function(): string)=} randomCharProvider A function that returns a random alphanumeric character
     */
    constructor(dateProvider = () => new Date(), randomCharProvider = () => DEFUALT_CHAR_PROVIDER()) {
        /**
         *  A function that provides the current date (helps with testing)
         * @type {function(): Date} 
         */
        this._dateProvider = dateProvider;
        /** 
         * A function that provides a random number between 0 and 1 (helps with testing)
         * @type {function(): string}
        */
       this._randomCharProvider = randomCharProvider;
    }

    /**
     * Generate an authentication string for today to send to another auth object
     * 
     * @returns {string} A pseudo-authentication string to send and be verified
     */
    generateAuth() {
        return this._generateAuth(0);
    }

    /**
     * Generate an authentication string for a given day to send to another auth object
     * 
     * @param {number} offset How many days ago the string represents
     * @param {string=} prefix The prefix to use for the authentication string
     * @returns {string} A pseudo-authentication string to send and be verified
     */
    _generateAuth(offset, prefix = this._randomPrefix()) {
        let now = this._dateProvider();
        now.setDate(now.getDate() - offset);
        let nowStr = now.getUTCFullYear() + '/' + now.getUTCMonth() + '/' + now.getUTCDate();
        let fullStr = prefix + nowStr + exports.Auth._getNoise(now.getUTCDate());
        return prefix + CONSTANTS.AUTH_SEPARATOR + HASH(fullStr);
    }

    /**
     * Check if a string was most likely generated by this class
     * 
     * @param {string} auth A pseudo-authentication string to check
     * @returns {boolean} Whether the auth string is valid + not expired
     */
    verifyAuth(auth) {
        let index = auth.indexOf(CONSTANTS.AUTH_SEPARATOR);
        if(index < 0) return false;
        
        let prefix = auth.substring(0, index);
        // In case authentication is happening on the day after it was sent
        return auth === this._generateAuth(0, prefix) || 
            auth === this._generateAuth(1, prefix);
    }
    
    /**
     * Generate a random string to append both before and after hash, in order to
     * allow for a much larger variety of authentication strings.
     * 
     * @returns {string} A 16-character random string
     */
    _randomPrefix() {
        let result = '';
        for(let i = 0; i < 16; i++) {
            result += this._randomCharProvider();
        }
        return result;
    }

    /**
     * Generate a (deterministic) string to assist in generating and verifying auth
     * 
     * @param {number} i A number used to help determine what the noise looks like
     * @returns {string} A constant string that is always the same for given i, 
     *                   but used in auth
     */
    static _getNoise(i) {
        let hash = HASH('sWG(U' + i + 'J34fe09g#' + i + '$U*G(R');
        let noise = hash.substring(i % 6, i % 6 + 15 + (i % 3) * 3);
        return noise;
    }
}