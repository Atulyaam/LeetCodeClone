const User = require("../models/users")
const validate = require("../utils/validate")

const register = async (req,res)=>{
   try {
      // first validating user given info
      validate(req.body)
      // creating it
      const {firstName,emailId,password}=req.body;
      // ager email id exsist kerta hai ki nahi ye bhi chek kern ahai usko like sakte hoo ya user.create automatically chekc ker leta hai
      // User.exists({emailId})  true false me ans aayegaa
      const user = await User.create(req.body)

      

      
   } catch (error) {
      res.status(400).send("Error: "+error)
   }

}
const login = (req,res)=>{

}
const logout =(req,res)=>{

} 
const getProfile =(req,res)=>{

} 
const changePassword =(req,res)=>{

}