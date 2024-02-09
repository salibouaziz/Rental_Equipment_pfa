import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams ,Link} from 'react-router-dom';
import './ViewProduct.css'; 
const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
        <p className="product-info">Quantity: {product.quantity}</p>
        <p className="product-info"> <span className="product-info1">${product.rentPerHour}</span>/ Hour</p>
        <p className="product-info"><span className="product-info1">${product.rentPerDay}</span>/ Day </p>
        <p className="product-info">
        Category: <Link to={`/products/byCategory/${product.category}`} >{product.categoryName}</Link>
      </p>
      <Link to={`/rent/${product._id}`}>
            <button className="rent-button">Rent Now</button>
          </Link> 
   </div>
    </div>
    </div>
  );
};

export default ViewProduct;
