import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link  } from 'react-router-dom';
import './ProductsByCategory.css'; 
const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/byCategory/${categoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);
 
  return (
    <div className="products-container">
         <h1 className="products-heading">Products for Category</h1>
    
         <ul className="products-list">
        {products.map((product) => (
          <li key={product._id} className="product-item1">
             <div className="product-details1">
           
            {product.image && (
              <img className="product-image1" src={product.image} alt={product.Title} />
            )}
              <strong className="product-name1">{product.Title}</strong>
              <Link to={`/viewproduct/${product._id}`} className="view-button">
              View
            </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsByCategory;
