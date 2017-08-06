const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const User = require ('../models/User');
const request = require("request");


const checkUser= (req,res,next)=>{
  const options = {
      url: 'https://gfb.eu.auth0.com/userinfo',
      method: 'GET',
      headers: {
          'Authorization': req.headers.authorization,
          'content-type': 'application/json'
      }
  };
  request(options,function(err,profile){
      const name = JSON.parse(profile.body).name;
      User.findOne({name:name},function(err,user){
        console.log('user',user);

        let role= user.role;
        if(role=='user'){res.status(500),res.json({error:'permision denied'});return};
        if(role=='moderator' && req.body.type=='moderator'){res.status(500),res.json({error:'permision denied'});return};
        req.userRole = role;
        next();
      })

  })



}




module.exports = checkUser;
