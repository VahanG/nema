const User = require ('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.use(function(req,res,next){
    res.locals.role = 'admin';

    next();
})



router.get('/info',function(req,res){
  res.json({role:res.locals});

})



module.exports =router;
