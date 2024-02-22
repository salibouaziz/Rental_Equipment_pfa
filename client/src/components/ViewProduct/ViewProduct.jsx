import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";
import {useSelector } from 'react-redux';
import { useParams ,Link, useNavigate} from 'react-router-dom';
import moment from 'moment';
import './ViewProduct.css'; 
const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Get login state
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
  const handleRentNow = async () => {
    try {
      // Check if user is logged in
      if (!isLoggedIn ) {
        navigate('/login'); // Redirect to login page if not logged in
        return;
      }
      if(!startDate || !endDate){
        toast.error('Please select both start and end dates', {
          position: "bottom-left"
      });
      }
      const startDateInLocalTimezone = moment(startDate).format(); // Convert start date to local timezone
      const endDateInLocalTimezone = moment(endDate).format(); // Convert end date to local timezone

      const response = await axios.post(`http://localhost:3001/api/rental/${product._id}`, {
        bookedTimeSlots: {
          from: startDateInLocalTimezone,
          to: endDateInLocalTimezone,
        }
      });
  
      // Check if the rental was created successfully (status code 201)
      if (response.status === 201) {
        toast.success('Rental created successfully', {
            position: "bottom-left"
        });
        navigate(`/cart`);
      } else {
        toast.error(response.data.message, {
            position: "bottom-left"
        });
      }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
            position: "bottom-left"
        });
        } else {
        toast.error("An error occurred while processing your request.", {
            position: "bottom-left"
        });
    }
  }
  };
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
 <h1 className="product-heading">Shop</h1>

    <div className="product-container">

      {product.image && (
        <img
          className="product-image"
          src={product.image}
          alt={product.Title}
        />
      )}
      <div className="product-details">
        <h1 className="product-title">{product.Title}</h1>
        <p className="product-info">Description: {product.description}</p>
        <p className="product-info"> <span className="product-info1">${product.rentPerHour}</span>/ Hour</p>
        <p className="product-info"><span className="product-info1">${product.rentPerDay}</span>/ Day </p>
        <p className="product-info">
        Category: <Link to={`/products/byCategory/${product.category}`} >{product.categoryName}</Link>
      </p>
      <div className="date-picker-container">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="From Date"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy h:mm aa"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="To Date"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy h:mm aa"
            />
          </div>
          <button onClick={handleRentNow} className="rent-button">Rent Now</button> 
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
