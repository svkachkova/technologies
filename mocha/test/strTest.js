const mocha = require('mocha');
const chai = require('chai');

const expect = chai.expect;

const strReverse = require('../strReverse');

describe('Reverse String Test', () => {
    
    it('Checks if the strings is reversed', () => {

        let str1 = strReverse('Mocha is cool!!');
        let str2 = strReverse('Chai is super supportive.');

        expect(str1).to.equal('!!looc si ahcoM');
        expect(str2).to.equal('.evitroppus repus si iahC')
    });
});
