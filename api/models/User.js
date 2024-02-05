import mongoose from 'mongoose';
const {ObjetcId} = mongoose.Schema;
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: {
    type:String,
    required:[true, "Please add a name"],
  },
  email:{
    type:String,
    required:[true, "Please add an email"],
    unique:true,
    trim:true,
    match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email"],
  },
  photo: {
    type: String,
    default:"https://www.shareicon.net/data/128x128/2016/05/24/770137_man_512x512.png",
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Password must be up to 6 characters"],
  },
  
  phone: {
    type: String, 
    default:"+216"
  },
  address: {
    type: Object,
    //adress, state, country
  },
  isAdmin:{
    type: Boolean,
    required:true,
    default:false,
  },
},
{timestamps:true}
);
//Encrypt password before saving to db
UserSchema.pre("save",async function(next){//pre means before you save your password verify this function
  if(!this.isModified("password")){
    return next();
  }
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password,salt);
  this.password = hashedPassword;
  next();
})
export default mongoose.model("User", UserSchema);