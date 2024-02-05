import React from 'react'
import Header from '../common/header/Header'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from '../auth/login/Login'
import Register from '../auth/register/Register'
import Home from '../home/Home'
import Categories from '../categories/Categories'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Pages = () => {
  //we will add credentials to every Http request we make
  axios.defaults.withCredentials = true;
  return (
    <>
    <Router>
      <ToastContainer/>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/categories' element={<Categories />} />
      </Routes>
    </Router>
  </>)
}

export default Pages