//it has an http request code to make request to the backend using axios
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/auth/`;

//Register User
const register= async(userData) => { //userData is the data that will be sent to the backend
  const response = await axios.post(API_URL + "register",userData,{
    //we want to make this request with some form of credentails especially with protect request
    withCredentials: true,
  });
  return response.data;
};
//Login User
const login= async(userData) => { //userData is the data that will be come from the backend
  const response = await axios.post(API_URL + "login",userData);
  return response.data;
};
//Logout User
const logout= async() => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};
//getLoginStatus
const getLoginStatus = async() => {
  const response = await axios.get(API_URL + "getLoginStatus");
  return response.data;
};
const authService ={ 
  register,
  login,
  logout,
  getLoginStatus,
};
export default authService;
