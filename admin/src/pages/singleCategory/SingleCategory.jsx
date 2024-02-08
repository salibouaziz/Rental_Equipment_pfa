import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singleCategory.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { categoryColumns } from "../../datatablesource";

const SingleCategory = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState({});

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`/categories/${categoryId}`);
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchCategoryData();
  }, [categoryId]);

  const handleEdit = () => {
    setEditMode(true);
    // Initialize edited category with current category data
    setEditedCategory(categoryData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`/categories/${categoryId}`, editedCategory);
      // Refresh category data after successful update
      setCategoryData(editedCategory);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating category:", error);
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
                <h1 className="title">Information</h1>
                {categoryData && (
                  <div className="item">
                    <img src={categoryData.image} alt="" className="itemImg" />
                    <div className="details">
                      <h1 className="itemTitle">{categoryData.name}</h1>
                      {categoryColumns.map((column) => (
                        <div key={column.field} className="detailItem">
                          <span className="itemKey">{column.headerName}:</span>
                          <span className="itemValue">{categoryData[column.field]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            {editMode && (
              <div className="editForm">
                Name:
                <input
                  type="text"
                  name="name"
                  value={editedCategory.name || ""}
                  onChange={handleInputChange}
                  placeholder="Category Name"
                />
                Image:
                <input
                  type="text"
                  name="image"
                  value={editedCategory.image || ""}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                />
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

export default SingleCategory;
