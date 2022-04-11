const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Validate Input Number', function(){
        test('should correctly read whole number input', function(){
            assert.equal(convertHandler.getNum('3lbs'), 3);
            assert.equal(convertHandler.getNum('52mi'), 52);
            assert.equal(convertHandler.getNum('12gal'), 12);
        });

        test('should correctly read decimal number input', function(){
            assert.equal(convertHandler.getNum('3.23kg'), 3.23);
            assert.equal(convertHandler.getNum('0.3456km'), 0.3456);
            assert.equal(convertHandler.getNum('129.56L'), 129.56);
        });

        test('should correctly read a fractional input', function(){
            assert.equal(convertHandler.getNum('3/4lbs'), 0.75);
            assert.equal(convertHandler.getNum('1/3mi'), 0.33333);
            assert.equal(convertHandler.getNum('25/11gal'), 2.27273);
        });

        test('should correctly read a fractional input with a decimal', function(){
            assert.equal(convertHandler.getNum('3.2/4kg'), 0.8);
            assert.equal(convertHandler.getNum('1/3.5km'), 0.28571);
            assert.equal(convertHandler.getNum('11.2/0.3L'), 37.33333);
        });

        test('should correctly return error on a double-fraction', function(){
            assert.equal(convertHandler.getNum('3/4/6lbs'), "invalid number");
            assert.equal(convertHandler.getNum('1/3.03/4/6mi'), "invalid number");
            assert.equal(convertHandler.getNum('1//0.3gal'), "invalid number");
        });

        test('should correctly default to a numerical value of 1 when no numerical input provided', function(){
            assert.equal(convertHandler.getNum('kg'), 1);
            assert.equal(convertHandler.getNum('km'), 1);
            assert.equal(convertHandler.getNum('L'), 1);
        });
    });

    suite('Validate Input Unit', function(){
        test('should correctly read each valid input unit', function(){
            assert.equal(convertHandler.getUnit('34Gal'), 'gal');
            assert.equal(convertHandler.getUnit('3.4L'), 'L');
            assert.equal(convertHandler.getUnit('2/4mi'), 'mi');
            assert.equal(convertHandler.getUnit('23Km'), 'km');
            assert.equal(convertHandler.getUnit('2/6lbs'), 'lbs');
            assert.equal(convertHandler.getUnit('2/2.6kg'), 'kg');
        });

        test('should correctly return an error for invalid input unit', function(){
            assert.equal(convertHandler.getUnit('23k'), 'invalid unit');
            assert.equal(convertHandler.getUnit('2'), 'invalid unit');
            assert.equal(convertHandler.getUnit('2/2.6lbs3'), 'invalid unit');
        });

        test('should correctly return the correct return unit for valid input unit', function(){
            assert.equal(convertHandler.getReturnUnit('gal'), 'L');
            assert.equal(convertHandler.getReturnUnit('L'), 'gal');
            assert.equal(convertHandler.getReturnUnit('mi'), 'km');
            assert.equal(convertHandler.getReturnUnit('km'), 'mi');
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        });

        test('should correctly return the spelled-out string unit for each valid input unit', function(){
            assert.equal(
                convertHandler.getString(1, 'gal', 3.78541, 'L'),
                '1 gallons converts to 3.78541 liters'
            );
            assert.equal(
                convertHandler.getString(1, 'L', 0.26417, 'gal'),
                '1 liters converts to 0.26417 gallons'
            );
            assert.equal(
                convertHandler.getString(1, 'mi', 1.60934, 'km'),
                '1 miles converts to 1.60934 kilometers'
            );
            assert.equal(
                convertHandler.getString(1, 'km', 0.62137, 'mi'),
                '1 kilometers converts to 0.62137 miles'
            );
            assert.equal(
                convertHandler.getString(1, 'lbs',  0.45359, 'kg'),
                '1 pounds converts to 0.45359 kilograms'
            );
            assert.equal(
                convertHandler.getString(1, 'kg', 2.20463, 'lbs'),
                '1 kilograms converts to 2.20463 pounds'
            );
        });
    });

    suite('Conversion Checks', function(){
        test('should correctly convert gal to L', function(){
            assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
            assert.equal(convertHandler.convert(1.5, 'gal'), 5.67812);
            assert.equal(convertHandler.convert(0.2, 'gal'), 0.75708);
        });

        test('should correctly convert L to gal', function(){
            assert.equal(convertHandler.convert(1, 'L'), 0.26417);
            assert.equal(convertHandler.convert(1.5, 'L'), 0.39626);
            assert.equal(convertHandler.convert(0.2, 'L'), 0.05283);
        });

        test('should correctly convert mi to km', function(){
            assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
            assert.equal(convertHandler.convert(1.5, 'mi'), 2.41401);
            assert.equal(convertHandler.convert(0.2, 'mi'), 0.32187);
        });

        test('should correctly convert km to mi', function(){
            assert.equal(convertHandler.convert(1, 'km'), 0.62137);
            assert.equal(convertHandler.convert(1.5, 'km'), 0.93206);
            assert.equal(convertHandler.convert(0.2, 'km'), 0.12427);
        });

        test('should correctly convert lbs to kg', function(){
            assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
            assert.equal(convertHandler.convert(1.5, 'lbs'), 0.68039);
            assert.equal(convertHandler.convert(0.2, 'lbs'), 0.09072);
        });

        test('should correctly convert kg to lbs', function(){
            assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
            assert.equal(convertHandler.convert(1.5, 'kg'), 3.30694);
            assert.equal(convertHandler.convert(0.2, 'kg'), 0.44092);
        });
    });
});