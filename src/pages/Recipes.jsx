import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';

export default function Recipes({ title = 'Meals' }) {
  const { recipes } = useContext(RecipesContext);
  const pathName = title.slice(0, title.length - 1);
  const recipesPerPage = 12;
  return (
    <div>
      Recipes
      <Header title={ title } />
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
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string,
};
