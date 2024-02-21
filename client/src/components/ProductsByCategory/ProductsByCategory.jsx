import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link  } from 'react-router-dom';
import './ProductsByCategory.css'; 
const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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
  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleApplySort = () => {
    let sortedProducts = [...products];
    if (sortType === 'rentPerHour' || sortType === 'rentPerDay') {
      sortedProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortType] - b[sortType];
        } else {
          return b[sortType] - a[sortType];
        }
      });
      setProducts(sortedProducts);
    }
  };
 
  return (
    <div className="products-container">
         <h1 className="products-heading">Products for Category</h1>
          <div className="sort-container">
          <select onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="rentPerHour">Rent Per Hour</option>
            <option value="rentPerDay">Rent Per Day</option>
          </select>
          <button onClick={handleApplySort}>Apply</button>
          <button onClick={toggleSortOrder}>
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
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
