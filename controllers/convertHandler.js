function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.split(/(?<=\d)(?=[a-zA-Z])/);;
    
    return result[0];
  };
  
  this.getUnit = function(input) {
    let result = input.split(/(?<=\d)(?=[a-zA-Z])/);
    
    return result[1];
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
        return initNum * galToL;
        break;
      case 'L':
        return initNum / galToL;
        break;
      case 'mi':
        return initNum * miToKm;
        break;
      case 'km':
        return initNum / miToKm;
        break;
      case 'lbs':
        return initNum * lbsToKg;
        break;
      case 'kg':
        return initNum / lbsToKg;
        break;
      default:
        return "Unit not found"
    }   
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
