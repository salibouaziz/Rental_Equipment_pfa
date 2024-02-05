import React from 'react'
import  { useEffect, useState } from 'react';
import axios from 'axios';
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
          {category.image && <img className="category-image" src={`/images/${category.image}`} alt={category.name} />}
          <strong className="category-name">{category.name}</strong>
        </li>
      ))}
    </ul>
  </div>
    
  )
}

export default Categories