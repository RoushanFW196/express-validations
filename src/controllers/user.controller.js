
const express=require('express');

const User=require('../models/user.model.js');
 const { body, validationResult } = require('express-validator');
const router= express.Router();

 router.post("/",
 body("first_name").notEmpty().withMessage("firtsname is required") ,
 body("last_name").notEmpty().withMessage("lastsname is required"),
 
 body("email").custom( async (value) => {
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if (!isEmail) {
      throw new Error("Please enter a proper email address");
    }
    const uniquEmail = await User.findOne({ email: value })
    .lean()
    .exec();
  if (uniquEmail) {
    throw new Error("Please try with a different email address");
  }
  return true;
 }),
 
 body("gender").notEmpty().withMessage("gender is required"),
body("age").custom((value)=>{
    if(value>1 && value<100){
        return true;
    }
}).withMessage("age should be in between 1 and 100"),
 
body("pincode").notEmpty().withMessage("enter pincode").
custom((value)=>{
    const pinstr=  value.toString();
  
    if(pinstr.length==6){ 
    return true;
    }
    else{
    throw new Error("pincode should be 6 characters long")
    }
}),

 async(req,res)=>{
     // console.log(body("age"))
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let customError=errors.array().map(({msg,param,location})=>{
            return{
                [param]:msg,
            };
        });
        return res.status(400).json({ errors:customError });
      }

    try{
        const adduser= await User.create(req.body);
        return res.status(201).json({ adduser});
    }
   catch(e){
       return res.status(500).json({status:"failed",message:e.message})
   }

 });


 router.get("/",async (req, res)=>{
      try{

      
     const getalluser= await User.find().lean().exec();
     res.status(501).send(getalluser)
      }
      catch(e){
        return res.status(500).json({status:"failed",message:e.message})
      }
 })


 module.exports =router;



