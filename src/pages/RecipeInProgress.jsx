import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import SearchContext from '../context/SearchContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipeInProgress() {
  const { recipeDetails } = useContext(RecipesContext);
  const { handleSearch } = useContext(SearchContext);
  const history = useHistory();
  const { pathname } = history.location;
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [details, setDetails] = useState({
    id: '',
    image: '',
    title: '',
    category: '',
    ingredients: [],
    video: undefined,
    instructions: '',
    nationality: '',
    alcoholicOrNot: '',
  });
  const [favoritesRecipes, setFavoritesRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  );
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(
    (JSON.parse(localStorage.getItem('favoriteRecipes')) || [])
      .some((r) => r.id === pathname.split('/')[2].toLowerCase()),
  );

  useEffect(() => {
    const id = pathname.split('/')[2];
    const path = `/${pathname.split('/')[1]}`;
    handleSearch({
      searchRadio: 'lookup',
      path,
      searchInput: id,
    });
  }, [handleSearch, pathname]);

  useEffect(() => {
    const ingredients = [];
    const keys = Object.keys(recipeDetails);
    const ingredientsKeys = keys.filter((key) => key.includes('strIngredient'));
    ingredientsKeys.forEach((key) => {
      if (recipeDetails[key]) {
        ingredients.push(recipeDetails[key]);
      }
    });
    setDetails({
      id: (recipeDetails.idMeal || recipeDetails.idDrink) ?? '',
      image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
      title: recipeDetails.strMeal || recipeDetails.strDrink,
      category: recipeDetails.strCategory,
      ingredients,
      video: recipeDetails.strYoutube ? (
        recipeDetails.strYoutube.replace('watch?v=', 'embed/')
      ) : undefined,
      instructions: recipeDetails.strInstructions,
      nationality: recipeDetails.strArea,
      alcoholicOrNot: recipeDetails.strAlcoholic,
    });
  }, [recipeDetails]);

  useEffect(() => {
    const ceckedIngredients = JSON.parse(localStorage.getItem('ceckedIngredients'));
    if (ceckedIngredients) {
      setCheckedIngredients(ceckedIngredients);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ceckedIngredients', JSON.stringify(checkedIngredients));
  }, [checkedIngredients]);

  const handleCheckboxChange = ({ target }, index) => {
    const isChecked = target.checked;
    if (isChecked) {
      setCheckedIngredients([...checkedIngredients, index]);
    } else {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    }
  };

  const handleShare = () => {
    const URL = `${window.location.origin}${pathname.replace('/in-progress', '')}`;
    setIsCopied(true);
    copy(URL);
    console.log(URL);
  };

  const handleFavoriteBtn = () => {
    const lessOne = -1;
    if (isRecipeFavorite) {
      const newFavoriteRecipes = favoritesRecipes
        .filter((r) => (
          r.id !== details.id
        ));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setFavoritesRecipes(newFavoriteRecipes);
      setIsRecipeFavorite(false);
    } else {
      const newFavoriteRecipe = {
        id: details.id,
        type: pathname.split('/')[1].slice(0, lessOne),
        nationality: details.nationality ?? '',
        category: details.category,
        alcoholicOrNot: details.alcoholicOrNot ?? '',
        name: details.title,
        image: details.image,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...favoritesRecipes,
        newFavoriteRecipe,
      ]));
      setFavoritesRecipes([...favoritesRecipes, newFavoriteRecipe]);
      setIsRecipeFavorite(true);
    }
  };

  useEffect(() => {
    if (checkedIngredients.length === details.ingredients.length) {
      setIsFinished(true);
    } else {
      setIsFinished(false);
    }
  }, [checkedIngredients, details.ingredients]);

  return (
    <div>
      <header>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShare }
        >
          {isCopied ? 'Link copied!' : 'Share'}

        </button>
        <button
          type="button"
          onClick={ handleFavoriteBtn }
          value={ details.id }
        >
          <img
            data-testid="favorite-btn"
            src={ isRecipeFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite"
          />
        </button>
        <p data-testid="recipe-category">
          { details.category }
        </p>
        <img
          data-testid="recipe-photo"
          src={ details.image }
          alt={ details.title }
        />
        <h1 data-testid="recipe-title">{ details.title }</h1>
      </header>

      {details.ingredients.map((ingredient, index) => (
        <label
          key={ `${details.id}-${index}` }
          data-testid={ `${index}-ingredient-step` }
          style={ { textDecoration: (
            checkedIngredients.includes(index)
              ? 'line-through solid rgb(0, 0, 0)' : 'none') } }
        >
          <input
            type="checkbox"
            checked={ checkedIngredients.includes(index) }
            onChange={ (event) => handleCheckboxChange(event, index) }
          />
          {ingredient}
        </label>
      ))}

      <section>
        <h4>Instructions</h4>
        <p data-testid="instructions">{ details.instructions }</p>
      </section>
      <footer>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !isFinished }
        >
          FINISH RECIPE

        </button>
      </footer>
    </div>
  );
}
