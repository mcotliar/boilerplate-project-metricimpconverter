const chai = require('chai');
const ConvertHandler = require('../controllers/convertHandler.js');
const { number } = require('mathjs');
const convertHandler = new ConvertHandler();
const expect = chai.expect;
const assert = chai.assert;
function toFixedIfNecessary( value, dp ){
  return +parseFloat(value).toFixed( dp );
}
describe('Unit Tests', function(){
  // Test for getNum
  it('should correctly read a whole number input.', () => {
    const result = convertHandler.getNum('10gal');
    chai.assert.equal(result,10);
  });
  it('convertHandler should correctly read a decimal number input', () => {
    const result = convertHandler.getNum('10.5gal');
    chai.assert.equal(result,10.5);
    expect(result).to.equal(10.5);
  });
  it('convertHandler should correctly read a fractional input.', () => {
    const result = convertHandler.getNum('1/2gal');
    chai.assert.equal(result,0.5);
    expect(result).to.equal(0.5);
  });
  it('should correctly read a fractional input with a decimal', () => {
    const result = convertHandler.getNum('1.5/6gal');
    chai.assert.equal(result,0.25);
    expect(result).to.equal(0.25);
  });
  it('should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
    expect(() => convertHandler.getNum('3/2/3gal')).to.throw('num');
    assert.throws(()=>convertHandler.getNum('3/2/3gal'),Error,"num"); 
    // expect(() => convertHandler.getNum('10/0')).to.throw('num');
  });
  it('should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    const result = convertHandler.getConversion('gal');
    expect(result.initNum).to.equal(1);
    assert.equal(result.initNum,1);
    // expect(() => convertHandler.getNum('10/0')).to.throw('num');
  });
  it('convertHandler should correctly read each valid input unit', () => {
    assert.doesNotThrow(()=>convertHandler.getConversion('1gal'),Error);
    assert.doesNotThrow(()=>convertHandler.getConversion('1mi'),Error);
    assert.doesNotThrow(()=>convertHandler.getConversion('1lbs'),Error);
    assert.doesNotThrow(()=>convertHandler.getConversion('1l'),Error);
    assert.doesNotThrow(()=>convertHandler.getConversion('1km'),Error);
    assert.doesNotThrow(()=>convertHandler.getConversion('1kg'),Error);
    });
  it('convertHandler should correctly return an error for an invalid input unit', () => {
    assert.throws(()=> convertHandler.getConversion('1mkb'),Error,"unit"); 
   });
  it('convertHandler should return the correct return unit for each valid input unit', () => {
    let result = convertHandler.getConversion('1gal');
    assert.equal(result.initUnit,'gal');
    result = convertHandler.getConversion('1mi');
    assert.equal(result.initUnit,'mi');
    result = convertHandler.getConversion('1lbs');
    assert.equal(result.initUnit,'lbs');
    result = convertHandler.getConversion('1l');
    assert.equal(result.initUnit,'L');
    result = convertHandler.getConversion('1km');
    assert.equal(result.initUnit,'km');
    result = convertHandler.getConversion('1kg');
    assert.equal(result.initUnit,'kg');
   });
  it('convertHandler should correctly return the spelled-out string unit for each valid input unit', () => {
    let result = convertHandler.getConversion('1gal');
    assert.match(result.string,/gallons/);
    result = convertHandler.getConversion('1mi');
    assert.match(result.string,/miles/);
    result = convertHandler.getConversion('1lbs');
    assert.match(result.string,/libres/);
    result = convertHandler.getConversion('1l');
    assert.match(result.string,/L/);
    result = convertHandler.getConversion('1km');
    assert.match(result.string,/kilometers/);
    result = convertHandler.getConversion('1kg');
    assert.match(result.string,/kilograms/);
    
   });
  it('convertHandler should correctly convert gal to L', () => {
    let result = convertHandler.getConversion('1gal');
    assert.equal(result.returnNum,3.78541);
   });
  it('convertHandler should correctly convert L to gal', () => {
    let result = convertHandler.getConversion('1L');
    assert.equal(result.returnNum,toFixedIfNecessary(1/3.78541,5));
   });
  it('convertHandler should correctly convert mi to km', () => {
    let result = convertHandler.getConversion('1mi');
    assert.equal(result.returnNum,1.60934);
   });
  it('convertHandler should correctly convert km to mi', () => {
    let result = convertHandler.getConversion('1km');
    assert.equal(result.returnNum,toFixedIfNecessary(1/1.60934,5));
   });
  it('convertHandler should correctly convert lbs to kg', () => {
    let result = convertHandler.getConversion('1lbs');
    assert.equal(result.returnNum,toFixedIfNecessary(0.453592,5));
   });
  it('convertHandler should correctly convert kg to lbs', () => {
    let result = convertHandler.getConversion('1kg');
    assert.equal(result.returnNum,toFixedIfNecessary(1/0.453592,5));
   });

});
