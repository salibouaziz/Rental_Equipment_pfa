import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singleRental.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { rentalColumns } from "../../datatablesource";

const SingleRental = () => {
  const { rentalId } = useParams();
  const [rentalData, setRentalData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedReturned, setEditedReturned] = useState("Yes"); // Initialize as "Yes" by default
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const response = await axios.get(`/rental/${rentalId}`);
        setRentalData(response.data);
        setEditedReturned(response.data.returned ? "Yes" : "No"); // Set the default value based on existing data
      } catch (error) {
        console.error("Error fetching rental data:", error);
        setError("Error fetching rental data");
      }
    };
    fetchRentalData();
  }, [rentalId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEditedReturned(value);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSubmit = async () => {
    try {
      // Convert "Yes" and "No" to boolean values for consistency
      const returned = editedReturned === "Yes" ? true : false;
      await axios.patch(`/rental/${rentalId}`, { returned });
      const response = await axios.get(`/rental/${rentalId}`);
      setRentalData(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating rental:", error);
      setError("Error updating rental");
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {!editMode && (
              <>
                <div className="editButton" onClick={handleEdit}>
                  Edit
                </div>
                <h1 className="title">Rental Information</h1>
                {rentalData && (
                  <div className="item">
                    <div className="details">
                      {rentalColumns.map((column) => (
                        <div key={column.field} className="detailItem">
                          <span className="itemKey">{column.headerName}:</span>
                          {column.field === "returned" ? ( // Handle the special case for "returned" field
                            <span className="itemValue">{rentalData.returned ? "Yes" : "No"}</span>
                          ) : (
                            <span className="itemValue">{rentalData[column.field]}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {error && <div className="error">{error}</div>}
              </>
            )}
            {editMode && (
              <div className="editForm">
                Returned:
                <select
                  value={editedReturned}
                  onChange={handleInputChange}
                >
                  <option value="Yes">Yes</option>
              
                </select>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            )}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending (Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleRental;
