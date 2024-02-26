// Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

import './Cart.css'
const Cart = () => {
  const [userRentals, setUserRentals] = useState([]);

  useEffect(() => {
    const fetchUserRentals = async () => {
      try {
        // Fetch user rentals from the backend
        const response = await axios.get('http://localhost:3001/api/rental/user'); // Update the URL
        setUserRentals(response.data);
      } catch (error) {
        console.error('Error fetching user rentals:', error);
      }
    };

    fetchUserRentals();
  }, []);
  const handleDelete = async (rentalId) => {
    try {
      // Make a request to delete the rental by ID
      await axios.delete(`http://localhost:3001/api/rental/delete/${rentalId}`);

      // Update the UI after successful deletion
      setUserRentals((prevRentals) => prevRentals.filter((rental) => rental._id !== rentalId));
    } catch (error) {
      console.error('Error deleting rental:', error);
    }
  };
  return (
    <div>
      <h1 className='rentalheading'>Your Rentals</h1>
      <table className="rentals-table">
     
        <tbody>
          {userRentals.map((rental) => (
            <tr key={rental._id} className='rental-separator'> 
             <td>
              <button  className="delete-button" onClick={() => handleDelete(rental._id)}>X</button>
            </td>
              <td>
                <img
                  src={rental.product.image}
                  alt={rental.product.Title}
                  className="rental-image"
                />
                <div className="product-details">
                <p className="product-info">
       <Link to={`/viewproduct/${rental.product._id}`} >{rental.product.Title}</Link>
      </p>
                </div>
              </td>
              <td >
  <dt className='namedate'>Pickup date:</dt>
  <dd>{new Date(rental.bookedTimeSlots.from).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</dd>
</td>
  <td >
  <dt className='namedate'>Return date:</dt>
  <dd>{new Date(rental.bookedTimeSlots.to).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</dd>
</td>

              <td className='namedate'>{rental.totalAmount}$</td>
              <td>
            
              <Link to={`/checkout/${rental._id}`} className="checkout-button">
              Checkout
           </Link>
            </td>  
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  
};

export default Cart;
