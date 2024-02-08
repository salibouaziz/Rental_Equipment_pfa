import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singleProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { productColumns } from "../../datatablesource";

const SingleProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data");
      }
    };
    fetchProductData();
  }, [productId]);

  const handleEdit = () => {
    setEditMode(true);
    // Initialize edited product with current product data
    setEditedProduct(productData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSubmit = async () => {
    try {
      const { Title, description, image, quantity, rentPerHour, rentPerDay } = editedProduct;
      await axios.patch(`/products/${productId}`, {
        Title,
        description,
        image,
        quantity,
        rentPerHour,
        rentPerDay
      });
      // Refresh product data after successful update
      const response = await axios.get(`/products/${productId}`);
      setProductData(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product");
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
                {productData && (
                  <div className="item">
                    <img src={productData.image} alt="" className="itemImg" />
                    <div className="details">
                      <h1 className="itemTitle">{productData.Title}</h1>
                      {productColumns.map((column) => (
                        <div key={column.field} className="detailItem">
                          <span className="itemKey">{column.headerName}:</span>
                          <span className="itemValue">{productData[column.field]}</span>
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
                Title:
                <input
                  type="text"
                  name="Title"
                  value={editedProduct.Title || ""}
                  onChange={handleInputChange}
                  placeholder="Product Title"
                />
                Description:
                <input
                  type="text"
                  name="description"
                  value={editedProduct.description || ""}
                  onChange={handleInputChange}
                  placeholder="Product Description"
                />
                CategoryName
                <input
                    type="text"
                    name="categoryName"
                    value={productData.categoryName || ""} // Display the categoryName from productData
                    readOnly // Make the input field read-only
                    placeholder="Category Name"
                />
                Image:

                <input
                  type="text"
                  name="image"
                  value={editedProduct.image || ""}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                />
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={editedProduct.quantity || ""}
                  onChange={handleInputChange}
                  placeholder="Quantity"
                />
                RentPerHour:
                <input
                  type="number"
                  name="rentPerHour"
                  value={editedProduct.rentPerHour || ""}
                  onChange={handleInputChange}
                  placeholder="Rent Per Hour"
                />
                RentPerDay:
                <input
                  type="number"
                  name="rentPerDay"
                  value={editedProduct.rentPerDay || ""}
                  onChange={handleInputChange}
                  placeholder="Rent Per Day"
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

export default SingleProduct;
