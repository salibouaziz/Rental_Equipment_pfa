import React from 'react';
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import  { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
const List = () => {
  const [rows, setRows] = useState([]);
  const [overdueRentals, setOverdueRentals] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products/sortedbyrentals/5');
        const productsWithRentalCounts = response.data;

        // Populate rows with fetched data
        setRows(productsWithRentalCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchOverdueRentals = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/rental/');
        const currentDate = new Date();

        // Identify overdue rentals
        const overdueRentals = response.data.filter((rental) => {
          const returnDate = new Date(rental.bookedTimeSlots.to);
          return !rental.returned && returnDate <= currentDate;
        });

        setOverdueRentals(overdueRentals);
      } catch (error) {
        console.error('Error fetching overdue rentals:', error);
      }
    };

    fetchOverdueRentals();
  }, []);



  return (
    <div className="tables-container">
    <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Product ID</TableCell>
              <TableCell className="tableCell">Product Name</TableCell>
              <TableCell className="tableCell">quantityTotal</TableCell>
              <TableCell className="tableCell">Rental Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row._id}</TableCell>
                <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={row.image} alt="" className="image" />
                      {row.Title}
                    </div>
                  </TableCell>
               
                <TableCell className="tableCell">{row.quantityTotal}</TableCell>
                <TableCell className="tableCell">{row.rentalCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Rental ID</TableCell>
              <TableCell className="tableCell">Product</TableCell>
              <TableCell className="tableCell">Email</TableCell>
              <TableCell className="tableCell">DateReturn</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overdueRentals.map((rental) => (
              <TableRow key={rental._id}>
                <TableCell className="tableCell">{rental._id}</TableCell>
                <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={rental.product.image} alt="" className="image" />
                      {rental.product.Title}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">
  <Link to={`/users/${rental.user._id}`} className="userLink">
    {rental.user.email}
  </Link>
</TableCell>               
                <TableCell className="tableCell">{new Date(rental.bookedTimeSlots.to).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</TableCell>
             
                <TableCell className="tableCell">
  <span className={`status ${rental.returned ? 'returned' : 'not-returned'}`}>
    {rental.returned ? 'Yes' : 'No'}
  </span>
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
};

export default List;
