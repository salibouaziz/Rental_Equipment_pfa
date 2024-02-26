import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from './hero/Hero';
import Categorie from './categorie/Categorie';

import CustomAlert from './CustomAlert'
const Home = () => {
  const [overdueRentals, setOverdueRentals] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOverdueRentals = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/rental/user');
        const currentDate = new Date();

        // Identify overdue rentals
        const overdueRentals = response.data.filter((rental) => {
          const returnDate = new Date(rental.bookedTimeSlots.to);
          return !rental.returned && returnDate <= currentDate;
        });

        setOverdueRentals(overdueRentals);

        // Show alert if there are overdue rentals
        if (overdueRentals.length > 0) {
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error fetching overdue rentals:', error);
      }
    };

    fetchOverdueRentals();
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Hero />
      <Categorie />

      {/* Custom Modal Component */}
      {showModal && (
        <CustomAlert onClose={handleCloseModal}>
          <div className="modal-content">
            <h2>Overdue Rentals</h2>
            {overdueRentals.map((rental) => (
              <p key={rental.id}>
                - Product: {rental.product.Title} - Return Date: {formatDate(rental.bookedTimeSlots.to)}
              </p>
            ))}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </CustomAlert>
      )}
    </>
  );
};

export default Home;
