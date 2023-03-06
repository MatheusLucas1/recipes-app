import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function RecipeInProgress() {
  const { recipeDetails } = useContext(RecipesContext);
  const { strMeal, strMealThumb, strCategory, strInstructions } = recipeDetails;
  return (
    <div>
      <header>
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        <p data-testid="recipe-category">
          { strCategory }
        </p>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
        />
        <h1 data-testid="recipe-title">{ strMeal }</h1>
      </header>
      <div>
        <h4>Category</h4>

      </div>
      <section>
        <h4>Instructions</h4>
        <p data-testid="instructions">{ strInstructions }</p>
      </section>
      <footer>
        <button type="button" data-testid="finish-recipe-btn">FINISH RECIPE</button>
      </footer>
    </div>
  );
}
