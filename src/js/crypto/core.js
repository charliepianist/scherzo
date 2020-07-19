/**
 * @fileoverview 
 * 
 * A file containing constants that are used throughout the
 * crypto code, such as an elliptic curve for all EC cryptography.
 * See https://github.com/indutny/elliptic for documentation of types.
 */

goog.module('scherzo.crypto.core');

const ELLIPTIC = goog.require('elliptic');
const SJCL = goog.require('sjcl');
const CURVE = 'curve25519';

/** @typedef {!Array<number>} */
let bitArray;

// Elliptic Curve
exports._curve = new ELLIPTIC.ec(CURVE);

/**
 * Hashing
 * @type {{
 *  hash: function((bitArray | string)): bitArray
 * }}
 */
exports._hasher = SJCL.hash.sha256;