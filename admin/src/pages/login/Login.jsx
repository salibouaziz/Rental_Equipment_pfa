import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
  
      if (res.data.isAdmin) {
        // Redirect to the Admin Panel
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/admin-panel");// Redirect to the admin panel directly
      } else {
        // Redirect to the Home Page
        navigate("/home");
      }
  
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", message: err.response.data });
    }
  };
  


  return (
  <div className="login-container" >
    <div className="login-body">
  
        <div className="center">
      
          <h1>Login</h1>
          <form>
          <div className="txt_field">
                <input
                  type="email"
                
                  id="email"
                  onChange={handleChange}
                  className="lInput"
                  required
                />
                <span></span>
                  <label>Email</label>
                </div>
                <div className="txt_field">
                <input
                  type="password"
                
                  id="password"
                  onChange={handleChange}
                  className="lInput"
                  required
                />
                <span></span>
                  <label>Password</label>
                </div>
                <div className="pass">Forgot Password?</div>
                <button disabled={loading} onClick={handleClick} className="lButton">
                  Login
                </button>
                <div className="signup_link">Don't have account? <a href="/register">Signup</a></div>
                {error && <span>{error.message}</span>}
        
          </form>
      </div>
    </div>
  </div>  
  );
};

export default Login;