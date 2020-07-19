goog.module('scherzo.crypto.authTest');
goog.setTestOnly();

goog.require('goog.testing.asserts');
const testSuite = goog.require('goog.testing.testSuite');
const AUTH = goog.require('scherzo.crypto.auth');

testSuite({
    testAuth_auth_acceptsOtherAuthString() {
        let alice = new AUTH.Auth();
        let bob = new AUTH.Auth();
        let aliceAuth = alice.generateAuth();
        let bobAuth = bob.generateAuth();

        assertNotEquals('With very high probability, Alice and Bob\'s auth strings should be different.',
            aliceAuth, bobAuth);
        assertTrue('Alice should accept Bob\'s auth string (' + bobAuth + ').',
            alice.verifyAuth(bobAuth));
        assertTrue('Bob should accept Alice\'s auth string (' + aliceAuth + ').',
            bob.verifyAuth(aliceAuth));
    },

    testAuth_auth_doesNotAcceptArbitraryString() {
        let arbitraryStrings = ['awefa8ivj-q8o7fgkbjgq9foeai', '1234567890'];
        let alice = new AUTH.Auth();
        for(let arbitraryString of arbitraryStrings) {
            assertFalse('Alice should not accept arbitrary auth string ' + arbitraryString,
                alice.verifyAuth(arbitraryString));
        }
    },

    /**
     * Tests implementation of Auth. Feel free to remove or update this test 
     * if implementation changes.
     */
    testAuth_auth_hasExpectedImplementation() {
        let fakeAuth = new AUTH.Auth(
            () => new Date(0), // Value used for "Today"
            () => 'a' // Value used for random characters
        );
        let auth = fakeAuth.generateAuth();
        let expected = 'aaaaaaaaaaaaaaaa-08c2640d771f735416458bab6a9f10ef8605e01c5ddd39914545561bbe1ca0fa';

        assertEquals('Given the original implementation of Auth, this should be its output.',
            expected, auth);
    }
});