const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);

describe('Functional Tests', function () {
    it('Convert a valid input such as 10L: GET request to /api/convert.', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '10L' })
            .end(function (err, res) {
                expect(err).to.be.null;
                assert.deepEqual(res.body,{
                    initNum: 10,
                    initUnit: 'L',
                    returnNum: 2.64172,
                    returnUnit: 'gal',
                    string: '10 L converts to 2.64172 gallons'
                  });
            });
    });
    it('Convert an invalid input such as 32g: GET request to /api/convert.', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '32g' })
            .end(function (err, res) {
                expect(err).to.be.null;
                //assert.equal(res.text,'invalid unit');
                assert.match(res.text,/invalid unit/);
            });
    });
    it('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kg' })
            .end(function (err, res) {
                expect(err).to.be.null;
                assert.match(res.text,/invalid number/);
            });
    });
    it('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kilomegagram' })
            .end(function (err, res) {
                expect(err).to.be.null;
                assert.match(res.text,/invalid number and unit/);
            });
    });
    it(' Convert with no number such as kg: GET request to /api/convert.', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: 'kg' })
            .end(function (err, res) {
                expect(err).to.be.null;
                assert.equal(res.body.initNum,1);
            });
    });
});
