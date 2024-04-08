
const validUnits = new Map();
validUnits.set('gal','l');
validUnits.set('mi','km');
validUnits.set('lbs','kg');
validUnits.set('l','gal');
validUnits.set('km','mi');
validUnits.set('kg','lbs');

const unitDescription = new Map();
unitDescription.set('gal','gallons');
unitDescription.set('l','L');
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
      throw new Error('invalid num');
    }
    
    return result[1];
  };
  
  this.getUnit = function(input) {
    let result =  input.match(/^[\d\.\/]+([a-zA-Z]+)$/);
    if (typeof result?.[1] === "undefined") {
      throw new Error('invalid unit');
    }
    const unit = result?.[1];
    if (!validUnits.get(unit)){
      throw new Error('invalid unit');
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
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result ;
    
    return result;
  };
  
  this.getConversion = function(input){
    console.log('trying to convert',input);
    input = input.toLowerCase();
    if (validUnits.get(input)) input='1'+input;
    const initNum = this.getNum(input)*1;
    let initUnit = this.getUnit(input);
    const returnNum = this.convert(initNum,initUnit)*1;
    const returnUnit = this.getReturnUnit(initUnit);

    let fullUnitName = this.spellOutUnit(initUnit);
    let fullReturnUnitName = this.spellOutUnit(returnUnit);
    if (fullUnitName === 'l'){
      fullUnitName = 'L';
    }
    
    if (fullReturnUnitName === 'l'){
      fullReturnUnitName = 'L';
    }
    const fullString = `${initNum} ${fullUnitName} converts to ${returnNum} ${fullReturnUnitName}`;

    const result = {initNum,initUnit,returnNum,returnUnit,string:fullString };
    return result;
  }
}

module.exports = ConvertHandler;
