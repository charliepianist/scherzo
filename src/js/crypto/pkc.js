/**
 * @fileoverview
 * 
 * A file containing methods and objects for use in Public Key Cryptography.
 * Specifically used for:
 * - Elliptic Curve Key Exchange
 */

goog.module('scherzo.crypto.pkc');

const CORE = goog.require('scherzo.crypto.core');

/** @typedef {{
 * getPublic: function(): Object,
 * getPrivate: function(): Object,
 * derive: function(Object): BigNumber
 * }} */
let EllipticKeyPair;
/** @typedef {{
 *  toString: function(number): string,
 *  words: Array<number>
 * }} */
let BigNumber;

exports.Exchange = class {
    /**
     * Creates an Exchange object, representing one side (Alice or Bob) of a Key Exchange
     * Protocol (in this implementation, ECDH), initialized with one side's KeyPair.
     */
    constructor() {
        /** @type {scherzo.crypto.pkc.KeyPair} */
        this._keyPair = new exports.KeyPair();
        /** @type {scherzo.crypto.pkc.KeyPair | null} */
        this._otherKeyPair = null;
        /** @type {BigNumber | null} */
        this._sharedKey = null;
    }
    
    /**
     * Returns a string representing this Exchange's public key, i.e. this object's
     * initial output in the Key Exchange Protocol.
     * 
     * @returns {string} This exchange's output, to be read in as input by another
     *                   exchange in order to form a shared secret key.
     */
    sendOutput() {
        return this._keyPair.toPublicString();
    }

    /**
     * Processes another Exchange object's output in this Exchange, then stores and 
     * returns the shared secret key.
     * 
     * @param {string} input The output from the other Exchange object
     * @returns {string} A string hexadecimal representation of the shared secret key
     */
    receiveInput(input) {
        try{
            this._otherKeyPair = exports.KeyPair.fromPublicString(input);
            this._sharedKey = this._keyPair.derive(this._otherKeyPair);
            // words being just [0] indicates a failed derive (I think)
            if(this._sharedKey.words.length === 1 && this._sharedKey.words[0] === 0) {
                this._sharedKey = null;
            }
        }catch(e) {
            this._sharedKey = null;
        }
        return this.getSharedKey();
    }

    /**
     * Returns the shared secret key as a hexadecimal string, if present, and null otherwise.
     * TODO: perhaps replace the return type with a Key type, with support for various formats and
     * direct use in library functions
     * 
     * @returns {string} The shared secret key (as a hexadecimal string) 
     *                   or empty string, if receiveInput hasn't yet been called
     *                   with a valid input.
     */
    getSharedKey() {
        if(this._sharedKey == null) return '';
        return this._sharedKey.toString(16);
    }
}

exports.KeyPair = class {
    /**
     * Creates a KeyPair wrapper, either from an existing object (elliptic.KeyPair)
     * or by generating a new one.
     * 
     * @param {EllipticKeyPair | null} keyPair The existing elliptic.KeyPair, or null if 
     *                                  a new one should be generated.
     */
    constructor(keyPair = null) {
        if(!keyPair) keyPair = CORE._curve.genKeyPair();
        /** @type {!EllipticKeyPair} */
        this._keyPair = keyPair;
    }

    /** 
     * Try deriving a shared secret key from this object's (Alice's) private key along with
     * a KeyPair object (Bob) containing the public key.
     * 
     * @param {!scherzo.crypto.pkc.KeyPair} publicKeyPair A KeyPair object containing the public key
     * @returns {!BigNumber} The shared secret key.
     */
    derive(publicKeyPair) {
        let keyPair = publicKeyPair.getEllipticKeyPair();
        return this._keyPair.derive(keyPair.getPublic());
    }

    /**
     * Returns the elliptic KeyPair (used by the library) of this KeyPair object.
     * 
     * @returns {!EllipticKeyPair} This KeyPair object's elliptic KeyPair
     */
    getEllipticKeyPair() {
        return this._keyPair;
    }

    /** 
     * Returns a string of this KeyPair's public key, directly shareable
     * 
     * @returns {string} The string representing this KeyPair's public key.
    */
    toPublicString() {
        return JSON.stringify(this._keyPair.getPublic().encode());
    }

    /**
     * Takes in a public key string (e.g. from toPublicString()) and returns a new KeyPair with 
     * that public key.
     * 
     * @param {string} publicString The string representation of a public key
     * @returns {!scherzo.crypto.pkc.KeyPair} A KeyPair object with the public key 
     *                                       described by publicString
     */
    static fromPublicString(publicString) {
        let publicBytes = JSON.parse(publicString);
        let keyPair = CORE._curve.genKeyPair();
        keyPair._importPublic(publicBytes);
        return new exports.KeyPair(keyPair);
    }
}