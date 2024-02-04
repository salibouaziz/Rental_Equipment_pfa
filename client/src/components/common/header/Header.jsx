import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsCart3 } from "react-icons/bs";
import {nav} from "../../data/Data"
import "./Header.css"
const Header = () => {
  const [navList, setNavList] = useState(false)
  return (
    <>
    <header>
      <div className='container flex'>
        <div className='logo'>
          <img src="./images/logo.png " alt="" />
        </div>
        <div className='nav'>
          <ul className={navList ? "small": "flex"}>
            {nav.map((list,index)=>(
              <li key={index}>
                <Link to={list.path}>{list.text}</Link>
              </li>
            ))}
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