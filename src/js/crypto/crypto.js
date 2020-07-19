/**
 * @fileoverview
 * 
 * A file containing all cryptographic methods and objects used by this extension.
 */

goog.module('scherzo.crypto');

const AUTH = goog.require('scherzo.crypto.auth');
const CORE = goog.require('scherzo.crypto.core');
const HASH = goog.require('scherzo.crypto.hash');
const PKC = goog.require('scherzo.crypto.pkc');

exports.AUTH = AUTH;
exports.CORE = CORE;
exports.HASH = HASH;
exports.PKC = PKC;

exports.test = function() {
    let alice = new PKC.KeyPair();
    let bob = new PKC.KeyPair();

    let bobSent = bob.toPublicString();
    let aliceReceived = PKC.KeyPair.fromPublicString(bobSent);
    console.log(bobSent);
    console.log(alice.toPublicString());
    console.log(alice.derive(aliceReceived).toString(16));
    console.log(bob.derive(PKC.KeyPair.fromPublicString(alice.toPublicString())).toString(16));
}