import jwt from "jsonwebtoken";
import createError from "../utils/error.js";
import User from "../models/User.js";

export const protect = async(req,res,next)=>{
  try {
    const token = req.cookies.access_token;
    if(!token){
      return next(createError(400, "Not Authorized, please login"));
    }
    //verify token
    const verified = jwt.verify(token,process.env.JWT);
    //get user id from token 
    const user = await User.findById(verified.id).select("-password");
    if(!user){
      return next(createError(404, "User Not Found!"));
    }
    req.user = user;
    next();
  } catch (err) {
    return next(createError(400, "Not Authorized!"));
  }
};

export const verifyUserAdmin = async(req,res,next)=>{
    if(req.user && (req.user.id === req.params.userid || req.user.isAdmin)){ // the owner of this user and the admin can delete account
      next();
    }else{
      return next(createError(403, "you are not authorized!"));
    }
};

export const verifyAdmin = async (req,res,next)=>{
  if(req.user && req.user.isAdmin){
    next();
  }else{
    return next(createError(400, "Not Authorized as an admin."));
  }
};