import React, { useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsCart3, BsSearch } from "react-icons/bs"
import { BiUser } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

import "./Header.css"
import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux'
import { RESET_AUTH, logout } from '../../../redux/features/auth/authSlice'
import {ShowOnLogin, ShowOnLogout} from '../../hiddenLink/hiddenLink'
const Header = () => {
  const [navList, setNavList] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showCartEmptyMessage, setShowCartEmptyMessage] = useState(false); // State to control the visibility of the cart empty message


  useEffect(() => {
    // Set username from user object if available
    if (user && user.username) {
      setUsername(user.username);
      localStorage.setItem('username', user.username); // Store username in local storage
    }
  }, [user]);

  useEffect(() => {
    // Retrieve username from local storage if available
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  const logoutUser = async()=>{
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    setCartCount(0);
    localStorage.removeItem('username');
    sessionStorage.removeItem('user');
    setUsername('');
    navigate("/login");
  }

    const fetchUserRentals = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/rental/user');
        setCartCount(response.data.length);
      } catch (error) {
        console.error('Error fetching user rentals:', error);
      }
    };

    

  useEffect(() => {
    const intervalId = setInterval(fetchUserRentals, 1000); // Fetch every 5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  
  }, [user]);
  // Function to handle search input change
  // Function to handle search input change
const handleSearchInputChange = async (event) => {
  const query = event.target.value;
  setSearchQuery(query);

  try {
    if (query.length >= 1) { // Ensure at least 2 characters for search
      const response = await axios.get(`http://localhost:3001/api/products/search/${query}`);
      setSearchResults(response.data);
    } else {
      setSearchResults([]);
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    setSearchResults([]);
  }
};


  console.log('Search query:', searchQuery); // Log the search query
  console.log('Search results:', searchResults); // Log the search results
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleCartClick = () => {
    if (cartCount === 0) {
      // Toggle cart empty message visibility
      setShowCartEmptyMessage(!showCartEmptyMessage);
    } else {
      // Navigate to cart page
      navigate("/cart");
    }
  };



  return (
    <>
    <header>
      <div className='container flex'>
        <div className='logo'>
          <Link to="/">RENT<span>UP</span></Link>
        </div>
        <div className='nav'>
          <ul className={navList ? "small": "flex"}>
            <li><Link to="/">home</Link></li>
            <li><Link to="/about">about</Link></li>
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
        
        <div className='search'>
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              )}
            </div>
            <div className="icon-container" onClick={toggleSearch}>
              <FiSearch size={25} />
               <ul className="search-results">
    {searchResults.map(product => (
      <li key={product._id} className="search-result-item">
        <img src={product.image} alt={product.Title} className="product-image123" />
        <Link to={`/viewproduct/${product._id}`}>
        <span className="product-name123">{product.Title}</span>
            </Link> 
      </li>
    ))}
  </ul>
            </div>
        
        <div className="cart-icon-container" onClick={handleCartClick}>
        
          <BsCart3 size={25} />
          <p className='cart-count'>{cartCount}</p>
          {showCartEmptyMessage && <div className="cart-empty-message">No products in the cart</div>}

          </div>
          <div className="icon-container"> {/* Container for the user icon */}
  <Link to="/login">
    <BiUser size={25} /> {/* User icon */}
  </Link>
</div> {username && <span className="username">{username}</span>}
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