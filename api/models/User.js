import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  img: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String, 
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true, // Adjust as per your requirement
    default: "active" // Set a default value if needed
  },
  isAdmin:{
    type: Boolean,
    default:false,
  },
},
{timestamps:true}
);

export default mongoose.model("User", UserSchema);