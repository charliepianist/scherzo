goog.module('scherzo.crypto.hashTest');
goog.setTestOnly();

goog.require('goog.testing.asserts');
const testSuite = goog.require('goog.testing.testSuite');
const HASH = goog.require('scherzo.crypto.hash');

let TEST_MAP = {
    'test_string1': '291ac4664cc84d2546fff3b17aaaf709c4f147d10da697e3263a56db9030f423',
    '!@#Rwg8oy8q2iu3rjaeg': '2af34866092ab78410e10ba4564f03bd92d84fe4dae01c04ebec7cc6af995b6a',
    'hello': '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    '': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
};

testSuite({
    testHash_OutputsCorrectSHA256Hashes() {
        for(let key of Object.keys(TEST_MAP)) {
            assertEquals(TEST_MAP[key], HASH(key));
        }
    }
});