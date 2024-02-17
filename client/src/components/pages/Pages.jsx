// pages.jsx
import React, { useEffect } from 'react';
import Header from '../common/header/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../auth/login/Login';
import Register from '../auth/register/Register';
import Home from '../home/Home';
import Categories from '../categories/Categories';
import ProductsByCategory from '../ProductsByCategory/ProductsByCategory'; 
import ViewProduct from '../ViewProduct/ViewProduct';
import Products from '../Products/Products';
import Footer from "../common/footer/Footer";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getLoginStatus } from '../../redux/features/auth/authSlice';
import About from "../about/About";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Cart from "../cart/Cart";
import Rental from '../rental/Rental';

const Pages = () => {
  // We will add credentials to every HTTP request we make
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  return (
    <Router>
      <>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route path='/products' element={<Products />} />
          <Route path='/categories' element={<Categories />} />
          <Route path="/products/byCategory/:categoryId" element={<ProductsByCategory />} />
          <Route path="/viewproduct/:id" element={<ViewProduct />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/rental/:rentid' element={<Rental />} />
          <Route path='/cart' element={<Cart />} />


        </Routes>
        <Footer />
      </>
    </Router>
  )
}

export default Pages;
