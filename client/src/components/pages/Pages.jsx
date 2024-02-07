import React, { useEffect } from 'react'
import Header from '../common/header/Header'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from '../auth/login/Login'
import Register from '../auth/register/Register'
import Home from '../home/Home'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { getLoginStatus } from '../../redux/features/auth/authSlice'
const Pages = () => {
  //we will add credentials to every Http request we make
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getLoginStatus());
  },[dispatch]);
  return (
    <>
    <Router>
      <ToastContainer/>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </Router>
  </>)
}

export default Pages