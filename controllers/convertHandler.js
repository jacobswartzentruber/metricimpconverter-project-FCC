function ConvertHandler() {
  
  this.getNum = function(input) {
    let index = input.search(/[a-zA-Z]/);
    let result = input.slice(0, index);
 
    return +eval(result).toFixed(5);
  };
  
  this.getUnit = function(input) {
    let index = input.search(/[a-zA-Z]/);
    let result = input.slice(index);
    
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
        return "Unit not found"
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
        return (initNum * galToL).toFixed(5);
        break;
      case 'L':
        return (initNum / galToL).toFixed(5);
        break;
      case 'mi':
        return (initNum * miToKm).toFixed(5);
        break;
      case 'km':
        return (initNum / miToKm).toFixed(5);
        break;
      case 'lbs':
        return (initNum * lbsToKg).toFixed(5);
        break;
      case 'kg':
        return (initNum / lbsToKg).toFixed(5);
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
