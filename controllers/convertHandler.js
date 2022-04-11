function ConvertHandler() {
  
  this.getNum = function(input) {
    let index = input.search(/[a-zA-Z]/);
    let number = input.slice(0, index);

    //If no number provided, return 1
    if(number == '') return 1;

    //Account for input as fractions
    let fractions = number.split('/');

    if(fractions.length > 2) return 'invalid number'

    if(fractions.length > 1) return +(parseFloat(fractions[0]) / parseFloat(fractions[1])).toFixed(5);

    //If no fractions input, return number
    return +parseFloat(number).toFixed(5);
  };
  
  this.getUnit = function(input) {
    const measures = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    let index = input.search(/[a-zA-Z]/);
    let result = input.slice(index).toLowerCase();

    result = measures.includes(result) ? result : "invalid unit"

    if(result == 'l') result = 'L';

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit){
      case 'gal':
        return 'L';
        break;
      case 'L':
        return 'gal';
        break;
      case 'mi':
        return 'km';
        break;
      case 'km':
        return 'mi';
        break;
      case 'lbs':
        return 'kg';
        break;
      case 'kg':
        return 'lbs';
        break;
      default:
        return "Unit not found, cannot get return unit"
    }    
  };

  this.spellOutUnit = function(unit) {
    let spellings = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    }

    return spellings[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch(initUnit){
      case 'gal':
        return +(initNum * galToL).toFixed(5);
        break;
      case 'L':
        return +(initNum / galToL).toFixed(5);
        break;
      case 'mi':
        return +(initNum * miToKm).toFixed(5);
        break;
      case 'km':
        return +(initNum / miToKm).toFixed(5);
        break;
      case 'lbs':
        return +(initNum * lbsToKg).toFixed(5);
        break;
      case 'kg':
        return +(initNum / lbsToKg).toFixed(5);
        break;
      default:
        return "Unit not found, cannot convert"
    }   
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
