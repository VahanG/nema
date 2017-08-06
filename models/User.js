const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
    'name':{
      type:String,
      required:true,
       unique: true
    },
    'role':{
      type:String,
      enum:["admin","moderator","user"],
      default:"user"
    },
    pages:{
      type:Array,
      default:['page1']
    }
})


module.exports =  mongoose.model('userSchema', userSchema);
