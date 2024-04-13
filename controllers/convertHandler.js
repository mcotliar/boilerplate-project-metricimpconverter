
const validUnits = new Map();
validUnits.set('gal','L');
validUnits.set('mi','km');
validUnits.set('lbs','kg');
validUnits.set('l','gal');
validUnits.set('km','mi');
validUnits.set('kg','lbs');

const unitDescription = new Map();
unitDescription.set('gal','gallons');
unitDescription.set('l','l');
unitDescription.set('L','L');
unitDescription.set('mi','miles');
unitDescription.set('km','kilometers');
unitDescription.set('lbs','libres');
unitDescription.set('kg','kilograms');


function ConvertHandler() {
  
  this.getNum = function(input) {
    const result = input.match(/^([\d.\/]*)(\w+)$/);
    if (typeof result?.[1] === "undefined") {
      throw new Error('invalid num');
    }
    let error = false;
    if (result[1] === ''){
      error = true;
    }

    else if (result[1].replaceAll('/','').length<result[1].length-1){
      error = true;
    }
    else {
      try{
        if (!isFinite(eval(result[1]))){
          error = true;
        }
      }
      catch(e){
        error = true;
      }
    }
    if (error) {
      throw new Error('number');
    }
    
    return result[1];
  };
  
  this.getUnit = function(input) {
    let result =  input.match(/^[\d\.\/]+([a-z]+)$/);
    if (typeof result?.[1] === "undefined") {
      throw new Error('unit');
    }
    const unit = result?.[1];
    if (!validUnits.get(unit)){
      throw new Error('unit');
    }
    
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = validUnits.get(initUnit);
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = unitDescription.get(unit);    
    return result;
  };
  function toFixedIfNecessary( value, dp ){
    return +parseFloat(value).toFixed( dp );
  }
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch(initUnit){
      case 'gal':
        result = initNum * galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'L': case 'l':
        result = initNum / galToL;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        throw new Error('number/unit invalid');
    }

    return toFixedIfNecessary(result,5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result ;
    
    return result;
  };
  
  this.getConversion = function(input){
    
    input = input.toLowerCase();
    console.log('trying to convert',input);
    if (validUnits.get(input)) input='1'+input;
    let errors = [];
    let initNum;
    try{
      initNum = this.getNum(input)*1;
    } catch(e){
      errors.push(e.message);
    }
    let initUnit;
    try{
     initUnit = this.getUnit(input);
    } catch(e){
      errors.push(e.message);
    }
    if (errors.length){
      const newErrorMessage = `invalid `+errors.join(' and ');
      throw new Error(newErrorMessage);
    }
    const returnNum = this.convert(initNum,initUnit)*1;
    let returnUnit = this.getReturnUnit(initUnit);

    let fullUnitName = this.spellOutUnit(initUnit);
    let fullReturnUnitName = this.spellOutUnit(returnUnit);
    if (initUnit === 'l'){
      initUnit = 'L';
      fullUnitName = 'L';
    }
    
    if (returnUnit === 'l'){
      returnUnit = 'L';
      fullReturnUnitName = 'L';
    }
    const fullString = `${initNum} ${fullUnitName} converts to ${returnNum} ${fullReturnUnitName}`;
    const result = {initNum,initUnit,returnNum,returnUnit,string:fullString };
    console.log('getConversion',{result});
    return result;
  }
}

module.exports = ConvertHandler;
