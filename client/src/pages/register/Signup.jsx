import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./signup.css";

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      // Assuming your registration API endpoint is "/api/auth/register"
      const res = await axios.post("/api/auth/register", userData);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="centerr">
       <h1>Signup</h1>
       <form>
       <div className="txxt_field">
        <input
          type="text"
         
          id="username"
          onChange={handleChange}
          className="rInput"
        />
         <span></span>
          <label>Username</label>
        </div>
        <div className="txxt_field">
        <input
          type="email"
        
          id="email"
          onChange={handleChange}
          className="rInput"
        />
         <span></span>
          <label>Email</label>
        </div>
        <div className="txxt_field">
        <input
          type="password"
          
          id="password"
          onChange={handleChange}
          className="rInput"
        />
         <span></span>
          <label>Password</label>
        </div>
        <div className="passs">Forgot Password?</div>
        <button disabled={loading} onClick={handleClick} className="rButtonn">
        Signup
        </button>
        <div className="signup_linkk">Already have an account? <a href="/Login">Login</a></div>
        {error && <span>{error.message}</span>}
        </form>
      </div>
   
  );
};

export default Register;
