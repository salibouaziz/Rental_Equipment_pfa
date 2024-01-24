import Login from "./pages/logins/Login";
import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import Signup from "./pages/register/Signup";
axios.defaults.baseURL="http://localhost:3002"
axios.defaults.withCredentials=true;
function App() {
  return (
    <div >
         <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
   <BrowserRouter>

   <Routes>
   <Route path="/register" element={<Signup />} />
   <Route path="/login" element={<Login />} />
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
