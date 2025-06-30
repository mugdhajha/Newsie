import React from 'react';
import '../styles/category.css';

const categories = ["Business", "Entertainment", "Science", "Sports"];

const Category = ({ topic, setTopic }) => {
  return (
    <div className="category-container">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-button ${topic === cat ? 'active' : ''}`}
          onClick={() => setTopic(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Category;

