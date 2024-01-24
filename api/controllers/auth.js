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

// auth.js
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or email!"));

    // Include isAdmin in the response
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
    const { password, ...otherDetails } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({ ...otherDetails, isAdmin: user.isAdmin });
    //the backend is sending the isAdmin field in the response.
  } catch (err) {
    next(err);
  }
}

