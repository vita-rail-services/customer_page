import React, { useEffect, useState } from 'react';
import "../styles/CategorySelectionPage.css";
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
 

function CategoryPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data); 
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    navigate('/menu');
  };

  return (
    <div className="category-container">
      <Header />
      <h2 className="category-title">Select a Category</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() => handleCategorySelect(cat.name)}
          >
            <img src={cat.img} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
