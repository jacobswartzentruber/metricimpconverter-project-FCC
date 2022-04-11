'use strict';

const expect = require('chai').expect;
const { init } = require('express/lib/application');
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let initNum = convertHandler.getNum(req.query.input);
      let initUnit = convertHandler.getUnit(req.query.input);

      if(initUnit == 'invalid unit' && initNum == 'invalid number'){
        res.send('invalid number and unit');
      }else if(initUnit == 'invalid unit'){
        res.send('invalid unit');
      }else if(initNum == "invalid number") {
        res.send("invalid number");
      }else{
        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        
        res.json({
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
        }) 
      }
      
    });

};
