import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsCart3 } from "react-icons/bs"
import "./Header.css"
import { useDispatch } from 'react-redux'
import { RESET_AUTH, logout } from '../../../redux/features/auth/authSlice'
import {ShowOnLogin, ShowOnLogout} from '../../hiddenLink/hiddenLink'
const Header = () => {
  const [navList, setNavList] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async()=>{
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  }
  return (
    <>
    <header>
      <div className='container flex'>
        <div className='logo'>
          <img src="./images/logo.png " alt="" />
        </div>
        <div className='nav'>
          <ul className={navList ? "small": "flex"}>
            <li><Link to="/">home</Link></li>
            <li><Link to="/about">about</Link></li>
            <li><Link to="/services">services</Link></li>
            <li><Link to="/products">products</Link></li>
            <li><Link to="/categories">categories</Link></li>
            <li><Link to="/contact">contact</Link></li>
            <ShowOnLogout>
            <li><Link to="/register">register</Link></li>
            <li><Link to="/login">login</Link></li>
            </ShowOnLogout>
            <ShowOnLogin>
            <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </ShowOnLogin>
          </ul>
        </div>
        <div className='button flex'>
        <div className="cart-icon-container">
          <Link to={"/cart"}> 
          <BsCart3 size={25} />
          <p className='cart-count'>0</p>
          </Link>
          </div>
          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header