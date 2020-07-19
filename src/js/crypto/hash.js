/**
 * @fileoverview
 * 
 * A file containing a hash function for use in things such as insecure
 * pseudo-authentication (in lieu of a secure method of authentication, as I
 * consider it unnecessary)
 */

goog.module('scherzo.crypto.hash');

const CORE = goog.require('scherzo.crypto.core');

/**
 * Returns the string representation of the hash of input, using the default hash
 * function defined in scherzo.crypto.core.
 * 
 * @param {string} input The input to be hashed
 * @returns {string} A string representation of the hash of input
 */
exports = function(input) {
    /**
     * Converts an integer into its hexadecimal representation as a string.
     * NOTE: Returns a minimum of 8 digits in hexadecimals (padding zeroes as necessary).
     * 
     * @param {number} dec A number, representing bits
     * @returns {string} A string representation (base 16) of the bits in dec (unsigned)
     */
    function dec2hex(dec) {
        let bin = (dec >>> 0).toString(2);
        let padZeroes = 32 - bin.length;
        for(let i = 0; i < padZeroes; i++) bin = '0'.concat(bin);
        return bin2hex(bin);
    }

    /**
     * Converts a binary string to hexadecimal.
     * 
     * @param {string} binaryString A string containing binary numbers e.g. '01001101'.
     *                              Must have length that is a multiple of 4.
     * @return {string} A string containing the hexadecimal numbers
     */
    function bin2hex(binaryString)
    {
        var output = '';
        for (var i=0; i < binaryString.length; i+=4)
        {
            var bytes = binaryString.substr(i, 4);
            var decimal = parseInt(bytes, 2);
            var hex = decimal.toString(16);
            output += hex;
        }
        return output;
    }

    let bitArray = CORE._hasher.hash(input);
    let hexArray = bitArray
        .map(num => dec2hex(num));
    let result = hexArray.join('');
    return result;
}