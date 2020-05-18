// const assert = require('assert');
const assert = require('chai').assert;

const pow = require('../pow');

describe('pow', () => {

    describe('возводит x в степень n', () => {

        function pow3(x) {
            const expected = x ** 3;
            it(`при возведении ${x} в 3-ю степень, результат: ${expected}`, () => {
                assert.equal(pow(x, 3), expected);
            });
        }

        for (let i = 1; i <= 5; i++) {
            pow3(i);
        }
    });

    it('при возведении в отрицательную степень результат NaN', () => {
        assert(isNaN(pow(2, -1)), 'pow(2, -1) не NaN');
    });

    it('при возведении в дробную степень результат NaN', () => {
        assert.isNaN(pow(2, 1.5));
    });

    describe('любое число, кроме нуля, в степени 0 равно 1', () => {

        function pow0(x) {
            it(`при возведении ${x} в степень 0 результат: 1`, () => {
                assert.equal(pow(x, 0), 1);
            });
        }

        for (var i = -3; i <= 3; i += 2) {
            pow0(i);
        }

    });

    it('ноль в нулевой степени даёт NaN', () => {
        assert.isNaN(pow(0, 0));
    });
});
