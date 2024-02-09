import React, { useEffect } from 'react'
import Header from '../common/header/Header'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from '../auth/login/Login'
import Register from '../auth/register/Register'
import Home from '../home/Home'
import Categories from '../categories/Categories';
import ProductsByCategory from '../ProductsByCategory/ProductsByCategory'; // Create a new component for displaying products by category
import ViewProduct from '../ViewProduct/ViewProduct';
import Products from '../Products/Products';
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
        <Route path='/products' element={<Products/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/categories' element={<Categories />} />
        <Route path="/products/byCategory/:categoryId" element={<ProductsByCategory />} />
        <Route path="/viewproduct/:id" element={<ViewProduct />} />

      </Routes>
    </Router>
  </>)
}

export default Pages