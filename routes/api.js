'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req,res)=>{
    const input  = req.query.input || '3.1mi';   
    let result;
    try{
      result = convertHandler.getConversion(input.trim());
    }
    catch(e){
      result = e.message;
    }
   // res.header('contentType','application/json');
    res.json(result);
    
  });
};
