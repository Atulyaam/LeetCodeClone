const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
  firstName:{
    type:String,
    minLength:3,
    maxLength:20,
    trim:true,
  },
  lastName:{
    type:String,
    minLength:3,
    maxLength:20,
    trim:true,
  
  },
  emailID:{
    type:String,
    require:true,
    unique:true,
    lowercase:true,
    immutable:true,
    trim:true,
  },
  password:{
    type:String,
    require:true,
    trim:true,
    minLength:8,

  },
  age:{
    type:Number,
    min:6,
    max:70,
    require:true,
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user', 
  },
  problemSolved:{
    type:[String]

  }
},{
  timestamps:true
})

const User  =mongoose.model("user",userSchema);
module.exports=User