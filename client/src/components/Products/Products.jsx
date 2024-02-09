// Products.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  './Products.css';
import { Link} from 'react-router-dom';
const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products'); // Adjust the API endpoint accordingly
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
 

  return (
   
    <div className="products-container2">
      <h1 className="products-heading2">All Products</h1>
     
      <ul className="products-list2">
        {products.map((product) => (
          <li key={product._id} className="product-item2">
        <div className="product-details2">
           
           {product.image && (
             <img className="product-image2" src={product.image} alt={product.Title} />
           )}
             <strong className="product-name2">{product.Title}</strong>
             <Link to={`/viewproduct/${product._id}`} className="view-button1">
             View
           </Link>
           </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
