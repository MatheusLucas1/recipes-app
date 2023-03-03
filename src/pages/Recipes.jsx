import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';

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
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string,
};
