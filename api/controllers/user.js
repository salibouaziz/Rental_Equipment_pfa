import User from "../models/User.js";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";
export const updateUser = async (req,res,next)=>{
  const user = await User.findById(req.user._id);
  if(user){
    const {username,phone,address} = user;
    user.username = req.body.username || username;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  }else{
    return next(createError(404, "User Not Found!")); 
  }
}
//update user photo
export const updatePhoto = async (req,res,next)=>{
  const {photo} = req.body;
  const user = await User.findById(req.user._id);
  user.photo = photo;
  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
};
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.userid);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err)
  }
}
export const getUser = async (req, res, next) => {
  try {
    const userid = req.params.userid; // Get the user ID from request parameters
    const user = await User.findById(userid).select("-password"); // Find the user by ID

    if (user) {
      res.status(200).json(user);
    } else {
      return next(createError(404, "User Not Found!"));
    }
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err)
  }
}
// Get login status
export const getLoginStatus = async (req,res,next)=>{
  const token = req.cookies.access_token;
  if(!token){
    return res.json(false);//if user logged in return true else false
  }
  //verify token
  const verified = jwt.verify(token,process.env.JWT);
  if(verified){
    return res.json(true);
  }else{
    return res.json(false);
  }
};