
const mongoose = require('mongoose')


const userschema=new mongoose.Schema({

  first_name:{type: 'string', required: true},
   last_name:{type: 'string', required: true},
   email:{type: 'string', required: true},
   pincode:{type: Number, required: true},
 age: {type: Number, required: true},
  gender:{type: String, required: true},

},{
    versionKey:false,
    timestamps:true
})

 const User=mongoose.model("user",userschema);

 module.exports = User;