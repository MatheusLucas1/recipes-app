import React, { useContext } from 'react';
import CategoriesContext from '../context/CategoriesContext';

export default function CategoriesFilter() {
  const { categories } = useContext(CategoriesContext);
  const maxCategories = 5;
  return (
    <div>
      {
        categories.slice(0, maxCategories).map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))
      }
    </div>
  );
}
