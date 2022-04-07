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
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      console.log(convertHandler.getString(initNum, initUnit, returnNum, returnUnit));
    });

};
