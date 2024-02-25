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
  const [editedReturned, setEditedReturned] = useState("No");
  const [editedRented, setEditedRented] = useState("No");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const response = await axios.get(`/rental/${rentalId}`);
        setRentalData(response.data);
        setEditedReturned(response.data.returned ? "Yes" : "No");
        setEditedRented(response.data.rented ? "Yes" : "No");
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
    const { name, value } = e.target;
    if (name === "returned") {
      setEditedReturned(value);
    } else if (name === "rented") {
      setEditedRented(value);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSubmit = async () => {
    try {
      // Prepare the updated fields based on the edited values
      const updatedFields = {};
      if (editedReturned !== rentalData.returned) {
        updatedFields.returned = editedReturned === "Yes";
      }
      if (editedRented !== rentalData.rented) {
        updatedFields.rented = editedRented === "Yes";
      }
      // If no fields have been changed, return early
      if (Object.keys(updatedFields).length === 0) {
        setEditMode(false); // Exit edit mode
        return;
      }
      // Send a patch request to update the rental with the changed fields
      await axios.patch(`/rental/${rentalId}`, updatedFields);
      // Update rentalData with the updated data from the server
      const response = await axios.get(`/rental/${rentalId}`);
      setRentalData(response.data);
      setEditMode(false); // Exit edit mode
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
                          {column.field === "returned" ? (
                            <span className="itemValue">{rentalData.returned ? "Yes" : "No"}</span>
                          ) : column.field === "rented" ? (
                            <span className="itemValue">{rentalData.rented ? "Yes" : "No"}</span>
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
                <div className="editFormItem">
                  Returned:
                  <select
                    name="returned"
                    value={editedReturned}
                    onChange={handleInputChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="editFormItem">
                  Rented:
                  <select
                    name="rented"
                    value={editedRented}
                    onChange={handleInputChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
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
