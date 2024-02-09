import React from 'react'
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Categories.css'; 
const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="categories-container">
      <h1 className="categories-heading">Categories</h1>
      <ul className="categories-list">
        {categories.map((category) => (
          <li key={category._id} className="category-item">
                        <Link to={`/products/byCategory/${category._id}`} className="category-link">

            <div className="category-details">
              {category.image && (
                <img
                  className="category-image"
                  src={category.image}  // Use the direct URL provided by Cloudinary
                  alt={category.name}
                />
              )}
              <strong className="category-name">{category.name}</strong>
            </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    
  )
}

export default Categories