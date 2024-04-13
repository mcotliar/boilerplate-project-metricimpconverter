const chai = require('chai');
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();
const expect = chai.expect;

describe('ConvertHandler Tests', () => {
  // Test for getNum
  it('should extract the number from a valid input string', () => {
    const result = convertHandler.getNum('10gal');
    expect(result).to.equal('10');
  });

  it('should throw an error for invalid number format', () => {
    expect(() => convertHandler.getNum('invalid')).to.throw('num');
    expect(() => convertHandler.getNum('10/0')).to.throw('num');
  });

  // Test for getUnit
  it('should extract the unit from a valid input string', () => {
    const result = convertHandler.getUnit('10.5gal');
    expect(result).to.equal('gal');
  });

  it('should throw an error for invalid unit', () => {
    expect(() => convertHandler.getUnit('10invalid')).to.throw('unit');
  });

  // Test for getReturnUnit
  it('should return the corresponding return unit for a given unit', () => {
    const result = convertHandler.getReturnUnit('gal');
    expect(result).to.equal('L');
  });

  // Test for spellOutUnit
  it('should return the full name of a unit', () => {
    expect(convertHandler.spellOutUnit('gal')).to.equal('gallons');
  });

  // Test for convert
  it('should convert from gallons to liters', () => {
    const result = convertHandler.convert(10, 'gal');
    expect(result).to.equal(37.8541);
  });

  // Add more test cases for other conversions

  it('should throw an error for invalid number/unit', () => {
    expect(() => convertHandler.convert(10, 'invalid')).to.throw('number/unit invalid');
  });

  // Test for getConversion
  it('should handle a complete conversion request', () => {
    const result = convertHandler.getConversion('10gal');
    expect(result).to.deep.equal({
      initNum: 10,
      initUnit: 'gal',
      returnNum: 37.8541,
      returnUnit: 'L',
      string: '10 gallons converts to 37.8541 L'
    });
  });
});
