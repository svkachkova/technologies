const divide = require('./index');

// Условие:
describe('when called', () => {
    // Ожидание:
    it('should return the result of division `a` over `b`', () => {
        const expected = 5;
        const result = divide(10, 2);
        expect(result).toEqual(expected);
    });
});

describe('when the result is not an integer', () => {

    const testCases = [
        { a: 10, b: 3, result: 3.33 },
        { a: 10, b: 6, result: 1.67 },
        { a: 10, b: 7, result: 1.43 },
    ];

    testCases.forEach(({ a, b, result }) => {
        it('shoult round it to 2 decimal places', () => {
            expect(divide(a, b)).toEqual(result);
        });
    });
});

describe('when specified a precision', () => {
    it('should round the result up to the decimal place specified in the settings', () => {
        expect(divide(10, 3, { precision: 5 })).toEqual(3.33333);
    });
});

describe('when tried to divide by 0', () => {
    it('should throw an error', () => {
        const attemp = () => divide(10, 0);
        const error = new Error("Maths doesn't work like that...");
        expect(attemp).toThrow(error);
    })
});
