import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import "./Login.css";
import { toast } from "react-toastify";
import { validateEmail } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, login, logout } from '../../../redux/features/auth/authSlice';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoggedIn,isSuccess,user} = useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = async(e) =>{
    //prevent the form from reloading
    e.preventDefault();
    if(!email || !password){
      return toast.error( "All fields are required", {
        position: "bottom-left"
      });
    }
    if(!validateEmail(email)){
      return toast.error( "Please enter a valid email", {
        position: "bottom-left"
      });
    }
    const userData = {
      email,
      password,
    }
    console.log(userData);
    //this is a redux now we will bring in a dispatch variable
    await dispatch(login(userData));
  };
  useEffect(() => {
    const handleLoginRedirect = async () => {
      if (isSuccess && isLoggedIn) {
        if (user && user.isAdmin) { // Check if user is admin
          try {
            
            // Navigate to the admin panel
            window.location.href = 'http://localhost:3002/admin-panel';
          } catch (error) {
            // Handle logout error
            console.error("Logout error:", error);
            // You may want to handle the error appropriately, e.g., redirect to a login page
          }
        } else {
          // If not admin, navigate to the user interface
          navigate("/");
  
          // Reset the auth state
          dispatch(RESET_AUTH());
        }
      }
    };
  
    // Invoke the async function
    handleLoginRedirect();
  }, [isSuccess, isLoggedIn, user, dispatch, navigate]);
  
  
  return (
  <div className="center">
   
  <h1>Login</h1>
  <form onSubmit={loginUser}>
  <div className="txt_field">
    <input
      type="email"
      placeholder="email"
      value={email}
      onChange={(e)=> setEmail(e.target.value)}
      required
    />
    <span></span>        
  </div>
  <div className="txt_field">

    <input
      type="password"
      placeholder="password"
      onChange={(e)=> setPassword(e.target.value)}
      value={password}
      required
    />
    <span></span>    
  </div>
  <button type='submit' className="lButton">
    Login
  </button>
  </form>
  <div className="signup_link">Don't have account? <Link to="/register">Signup</Link></div>
  
  </div>
 );
}

export default Login