import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req,res,next)=>{
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = User({
      username:req.body.username, 
      email:req.body.email, 
      password:hash, 
    });
    await newUser.save();
    res.status(200).send("User has been created successfully.")
  } catch(err){
    next(err);
  }
}

export const login = async (req,res,next)=>{
  try {
    const user = await User.findOne({email:req.body.email});
    if(!user) 
      return next(createError(404, "User not found!"));
    
    const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordCorrect) 
      return next(createError(400, "wrong password or email!"));
    //we're gonna hide these information and for each request we're gonna send this jwt 
    //to verify our identity(we need also a secret key)
    const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);
    const {password, isAdmin, ...otherDetails} = user._doc;
    res.cookie("access_token",token,{
     httpOnly: true, // it doesn't allow any client secret to reach this cookie
    }).status(200).json({...otherDetails});
  } catch(err){
    next(err);
  }
}