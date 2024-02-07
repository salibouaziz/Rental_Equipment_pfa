import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>{
  return jwt.sign({id},process.env.JWT,{
    expiresIn:"1d"
  })
}
export const register = async (req,res,next)=>{
  const {username,email,password} = req.body;
  //validation
  if(!username ||!email || !password){
    return next(createError(400, "Please fill in all required fields"));
  }
  if(password.length < 6){
    return next(createError(400, "Password must be up to 6 characters"));
  }
  //check if user exists
  const userExists = await User.findOne({email});
  if(userExists){
    return next(createError(400, "Email has already been registred"));
  }
  //create new user
  const user = await User.create({
    ...req.body,
    password
  });
  //Generate token
  const token = generateToken(user._id);
  if(user){
    const {_id, username,email,isAdmin} = user
    res.cookie("access_token",token,{
      path:"/",
      httpOnly:true,
      expires: new Date(Date.now() + 1000 * 86400),
    });
    //send user data
    res.status(201).json({
      _id, username, email, isAdmin, token
    });
  }else{
    return next(createError(400, "Invalid user data"));
  }

} 

export const login = async (req, res, next) => {
  const {email, password} = req.body;
  //validate Request
  if(!email || !password){
    return next(createError(400,"please add email and password"));
  }
  //check if user exists
  const user = await User.findOne({email});
  if(!user){
    return next(createError(404,"user not found"));
  }
  //User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password,user.password);
  //Generate token
  const token = generateToken(user._id);
  if(user && passwordIsCorrect){
    const newUser = await User.findOne({email}).select("-password");
    res.cookie("access_token",token,{
      path:"/",
      httpOnly:true,
      expires: new Date(Date.now() + 1000 * 86400),
    });
    //send user data
    res.status(201).json(newUser);
  }else{
    return next(createError(400,"invalid email or password"));
  }
}
export const logout = async (req, res, next) => {
  res.cookie("access_token","",{
    path:"/",
    httpOnly:true,
    expires: new Date(0),
  });
  return res.status(200).json({message: "Successfully logged out!"});
};
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

