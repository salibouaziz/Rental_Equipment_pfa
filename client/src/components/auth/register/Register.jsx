import {useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from "../../../redux/features/auth/authSlice";
const initialState ={
  username:"",
  email:"",
  password:"",
};
const Register = () => {
  const [formData,setFormData] = useState(initialState);
  const {username,email,password} = formData;
  const {isLoggedIn,isSuccess} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setFormData({...formData, [name]:value})
  };
  const registerUser = async(e)=>{
    //prevent the form from reloading
    e.preventDefault();
    if(!username||!email || !password){
      return toast.error( "All fields are required", {
        position: "bottom-left"
      });
    }
    if(password.length<6){
      return toast.error( "Pasword must be up to 6 characters", {
        position: "bottom-left"
      });
    }
    if(!validateEmail(email)){
      return toast.error( "Please enter a valid email", {
        position: "bottom-left"
      });
    }
    const userData = {
      username,
      email,
      password,
    }
    //this is a redux now we will bring in a dispatch variable
    await dispatch(register(userData));
  };
  useEffect(()=>{
    if(isSuccess && isLoggedIn){
      navigate("/login");
    }
    dispatch(RESET_AUTH());
  },[isSuccess,isLoggedIn,dispatch,navigate]);
  return (
    <div className="centerr">
       <h1>Signup</h1>
       <form onSubmit={registerUser}>
       <div className="txxt_field">
        <input
          type="text"
          id="username"
          value={username}
          name="username"
          placeholder="username"
          onChange={handleInputChange}
          className="rInput"
        />
         <span></span>
        </div>
        <div className="txxt_field">
        <input
          type="email"
          id="email"
          value={email}
          name="email"
          placeholder="email"
          onChange={handleInputChange}
          className="rInput"
        />
         <span></span>
        </div>
        <div className="txxt_field">
        <input
          type="password"
          id="password"
          value={password}
          name="password"
          placeholder="password"
          onChange={handleInputChange}
          className="rInput"
        />
         <span></span>
        </div>
        <button type='submit' className="lButton">
          SignUp
        </button>
        <div className="signup_linkk">Already have an account? <Link to="/login">Login</Link></div>
        </form>
      </div>
   
  );
};

export default Register;
