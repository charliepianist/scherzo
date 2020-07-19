goog.module('scherzo.crypto.pkcTest');
goog.setTestOnly();

goog.require('goog.testing.asserts');
const testSuite = goog.require('goog.testing.testSuite');
const pkc = goog.require('scherzo.crypto.pkc');

testSuite({
    testPkc_Exchange_derivesSameNonEmptySharedKey_withValidInput() {
        let exchange1 = new pkc.Exchange();
        let exchange2 = new pkc.Exchange();

        let public1 = exchange1.sendOutput();
        let public2 = exchange2.sendOutput();
        exchange1.receiveInput(public2);
        exchange2.receiveInput(public1);

        let shared1 = exchange1.getSharedKey();
        let shared2 = exchange2.getSharedKey();

        assertEquals('Two Exchange objects communicating directly should derive the ' +
                    'same key.', shared1, shared2);
        assertNonEmptyString('Two Exchange objects communicating directly should successfully ' +
                    'derive a shared key (that is, they should not both end up with a null key).',
                    shared1);
    },

    testPkc_Exchange_derivesEmptySharedKey_andDoesNotThrowException_withInvalidJson() {
        let invalidPublics = ['13"9e}ry8f{kj:b'];
        for(let invalidPublic of invalidPublics) {
            let exchange = new pkc.Exchange();
            exchange.receiveInput(invalidPublic);
            let shared = exchange.getSharedKey();

            assertEquals('Public key "' + invalidPublic + '" should derive an empty key.', 
                '', shared);
        }
    },

    testPkc_Exchange_derivesEmptySharedKey_andDoesNotThrowException_withValidJsonInvalidInput() {
        let invalidPublics = [
            '{ "key": "value" }',
            '{ "array": [33,201,207,220,176,189,51,163,117,23,21,48,92,99,236,71,92,41,54,53,186,2,141,69,215,179,43,19,78,220,184,193] }',
            '{}',
            '[]',
        ];

        for(let invalidPublic of invalidPublics) {
            let exchange = new pkc.Exchange();
            exchange.receiveInput(invalidPublic);
            let shared = exchange.getSharedKey();

            assertEquals('Public key "' + invalidPublic + '" should derive an empty key.', 
                '', shared);
        }
    },

    testPkc_Exchange_hasEmptySharedKey_beforeGivenInput() {
        let exchange = new pkc.Exchange();
        let shared = exchange.getSharedKey();
        assertEquals('An Exchange object that hasn\'t been given a public key should return empty shared key.', 
            '', shared);
    }
});