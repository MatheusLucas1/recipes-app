import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import SearchContext from '../context/SearchContext';
import CategoriesContext from '../context/CategoriesContext';
import './css/Recipes.css';

export default function Recipes({ title = 'Meals' }) {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const { handleSearch } = useContext(SearchContext);
  const { getCategories } = useContext(CategoriesContext);
  const pathName = title.slice(0, title.length - 1);
  const recipesPerPage = 12;

  useEffect(() => {
    window.scrollTo(0, 0);
    setRecipes([]);
    handleSearch(
      { searchInput: '', searchRadio: 'name', path: `/${title.toLowerCase()}` },
    );
    getCategories(`/${title.toLowerCase()}`);
  }, [title, handleSearch, setRecipes, getCategories]);

  return (
    <div className="recipesPage">
      <Header title={ title } />
      <div className="recipes">
        {
          recipes.slice(0, recipes < recipesPerPage ? recipes : recipesPerPage).map(
            (recipe, i) => (
              <RecipeCard
                key={ recipe[`id${pathName}`] }
                id={ i }
                name={ recipe[`str${pathName}`] }
                image={ recipe[`str${pathName}Thumb`] }
              />
            ),
          )
        }
      </div>
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string,
};
