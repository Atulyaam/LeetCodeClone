const User = require("../models/users")
const validate = require("../utils/validate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req,res)=>{
   try {
      // first validating user given info
      validate(req.body)
      // creating it
      const {firstName,emailId,password}=req.body;
      // ager email id exsist kerta hai ki nahi ye bhi chek kern hai usko like sakte hoo ya user.create automatically chekc ker leta hai
      // User.exists({emailId})  true false me ans aayegaa
      // hashing the password
      req.body.password = await bcrypt.hash(password,10)
      const user = await User.create(req.body)
        // after rigster user directolly directed to web page no need to relogin
      const token =  jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60})
      res.cookie('token',token,{maxAge:60*60*1000})
      res.status(201).send("User Registerd Succsessfully")

      

      
   } catch (error) {
      res.status(400).send("Error: "+error)
   }

}
const login = async (req,res)=>{
   try {
      const {emailId,password} = req.body;
      if(!(emailId || password)){
         throw new Error("Invalid Credentials")
      }
      const user= User.findOne({emailID})
      // password verification
      const check =bcrypt.compare(password,user.password);
      if(!check){
         throw new Error("Invalid Credentials")
      }
      const token = jwt.sign({_id:user._id,emailId:user.emailId},process.env.JWT_KEY,{expiresIn:60*60})

      res.cookie('token',token,{maxAge:60*60*1000})
      res.status(200).send("Logged in Succsessfully")
      
      
   } catch (error) {
      res.status(401).send("Error: "+error)
      
   }


}
const logout = async(req,res)=>{
   try {
      
      
   } catch (error) {
      res.status(401).send("Error: "+error)
      
   }

} 
const getProfile =(req,res)=>{

} 
const changePassword =(req,res)=>{

}