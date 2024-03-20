import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singleProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";
import { productColumns } from "../../datatablesource";

const SingleProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
 
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        setProductData(response.data);
        setEditedProduct(response.data);
      
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data");
      }
    };
    fetchProductData();
  }, [productId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = editedProduct.image; // Use the existing image URL by default
  
      if (file) {
        // If a new file is selected, upload it to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'upload');
  
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dk6jzdkfw/image/upload",
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
  
        imageUrl = uploadRes.data.url; // Update imageUrl with the newly uploaded image URL
      }
  
      const updatedProduct = {
        ...editedProduct,
        image: imageUrl,
      };
  
      await axios.patch(`/products/${productId}`, updatedProduct);
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
                    value={productData.categoryName || ""}
                    readOnly
                    placeholder="Category Name"
                />
                Image:
                <input
                  type="file"
                  onChange={handleFileChange}
                />
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="previewImage"
                  />
                )}
                QuantityTotal:
                <input
                  type="number"
                  name="quantityTotal"
                  value={editedProduct.quantityTotal || ""}
                  onChange={handleInputChange}
                  placeholder="Quantity Total"
                />
                QuantityPanne:
                <input
                  type="number"
                  name="quantityPanne"
                  value={editedProduct.quantityPanne || ""}
                  onChange={handleInputChange}
                  placeholder="Quantity Panne"
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
