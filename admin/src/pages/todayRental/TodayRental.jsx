// TodayRental.jsx

import "./TodayRental.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { rentalColumns } from "../../datatablesource";


const TodayRental = () => {
  const { productId } = useParams();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productTitle, setProductTitle] = useState("");

  useEffect(() => {
    const fetchTodayRentals = async () => {
      try {
        const response = await axios.get(`/rental/today/${productId}`);
        const rentalsArray = Object.values(response.data).flatMap(rentals => rentals);
        setRentals(rentalsArray);
        setLoading(false);
        console.log("Today's Rentals:", rentalsArray);

        if (rentalsArray.length === 0) {
          // Fetch product title if there are no rentals
          const productResponse = await axios.get(`/products/${productId}`);
          setProductTitle(productResponse.data.Title);
          alert(`No rentals for product ${productResponse.data.Title} today.`);
        }
      } catch (err) {
        console.error("Error fetching today's rentals:", err);
        setLoading(false);
      }
    };

    fetchTodayRentals();
  }, [productId]);

  const getRowId = (row) => `${row._id}_${row.user._id}`;

  return (
    <div className="today-rental-container">
      <Sidebar />
      <div className="today-rental-content">
        <Navbar />
        <div className="today-rental-just">
          <h1>Today's Rentals</h1>
          <DataGrid
            rows={rentals}
            columns={rentalColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={getRowId}
          />
        </div>
      </div>
    </div>
  );
};

export default TodayRental;
