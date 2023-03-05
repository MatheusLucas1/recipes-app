import React, { useContext } from 'react';
import CategoriesContext from '../context/CategoriesContext';

export default function CategoriesFilter() {
  const { categories } = useContext(CategoriesContext);
  const maxCategories = 5;
  return (
    <div>
      {
        categories.slice(0, maxCategories).map((category, i) => (
          <button
            type="button"
            key={ `${category.strCategory}-${i}` }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))
      }
    </div>
  );
}
