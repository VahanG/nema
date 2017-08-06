'use strict';

const User = require ('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const http = require('http');
const checkUser = require('../middlewares/checkUser')



router.use(function(req,res,next){

   next();

})
router.get('/:username',function(req,res){
    console.log(req.body);
    let username  =  req.params.username;
    let usera = User.findOne({name:username},function(err,user){
      if (err){res.status(409),res.json({error:err});return;};
      let data=user;
      //if(user){data= Object.assign({},user._doc,{pages:['page1','admin']})};
      res.json(user);
    })

})

router.put('/',checkUser,function(req,res){

   console.log(req.userRole);
   User.update({role:req.body.type},{pages:req.body.pages},{"multi": true},function(err,result){
     if (err){res.status(409),res.json({error:err});return;};
     res.json(result);
   })

})

router.post('/',function(req,res){
  User.findOne ({role:req.body.role},function(err,result){
      if (err){res.status(409),res.json({error:err});return;};
      let pages = ['page1'];
      if(result){
         pages = result.pages;

      }
      //console.log('result',result.pages);
      /*if(req.body.role=='admin'||req.body.role=='moderator'){
        pages.push('admin');
      }*/
      let user=Object.assign({},req.body,{pages});
      User.create(user , function (err, user) {
          if (err){res.status(409),res.json({error:err});return;};
          res.json(user);
      })
  })
//  res.json({message:'ha'})
})

router.post('/userPages',function(req,res){
  User.findOne({role:req.body.type},function(err,user){
    res.json(user.pages);
  })
})
//router.get('/moderatorPages',checkUser,function(req,res){})

module.exports =router;
