const assert = require('assert');


function normalizeFloatPart(number, floatSize) {
    if (number === 0) {
        return number;
    }

    var cof = number < 0
        ? -1
        : 1;
    var preparedNumber = cof * number;

    var intPart = Math.floor(preparedNumber);
    var floatPart = preparedNumber - intPart;

    if (floatPart) {
        if (floatSize == null) {
            floatSize = 2;
        }
        var tenPow = Math.pow(10, floatSize);
        var rounded = Math.round(floatPart * tenPow) / tenPow;

        return cof * (intPart + rounded);
    }

    return number;
}

describe('normalizeFloatPart', () => {

    it('base', () => {
        assert.strictEqual(normalizeFloatPart(.3 + .6), 0.9);
    });

    it('negative', () => {
        assert.strictEqual(normalizeFloatPart(-.3 + -.6), -0.9);
    });

    it('zero', () => {
        assert.strictEqual(normalizeFloatPart(0), 1);
    });

});