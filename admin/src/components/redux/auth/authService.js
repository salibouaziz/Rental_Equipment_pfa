//it has an http request code to make request to the backend using axios
import axios from "axios";

const BACKEND_URL = "http://localhost:3001";
export const API_URL = `${BACKEND_URL}/api/auth/`;



//Logout User
const logout= async() => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

const authService ={ 
 
  logout

};
export default authService;
