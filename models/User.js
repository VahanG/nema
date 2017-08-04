const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
    'name':{
      type:String,
      required:true
    },
    'role':{
      type:String
    }
})


module.exports = 
