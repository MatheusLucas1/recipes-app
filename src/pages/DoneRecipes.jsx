import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { mockRecipes } from '../mocks/mockDoneRecipes';
import ToastContainer from './ToastContainer';

function DoneRecipes() {
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function setMock() {
      const recipes = mockRecipes.map((recipe) => {
        if (recipe.idMeal) {
          return {
            id: recipe.idMeal,
            type: 'meal',
            nationality: recipe.strArea,
            category: recipe.strCategory || '',
            alcoholicOrNot: '',
            name: recipe.strMeal,
            image: recipe.strMealThumb,
            doneDate: Date.now(),
            tags: recipe.strTags ? recipe.strTags.split(',').slice(0, 2) : [],
          };
        }
        if (!recipe.idMeal) {
          return {
            id: recipe.idDrink,
            type: 'drink',
            nationality: recipe.strArea || '',
            category: recipe.strCategory || '',
            alcoholicOrNot: recipe.strAlcoholic === 'Alcoholic'
              ? 'alcoholic' : 'non-alcoholic',
            name: recipe.strDrink,
            image: recipe.strDrinkThumb,
            doneDate: Date.now(),
            tags: recipe.strTags ? recipe.strTags.split(',').slice(0, 2) : [],
          };
        }
        return recipe;
      });
      localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    }
    setMock();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setCompletedRecipes(doneRecipes);
  }, []);

  const shareRecipe = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setVisible(true);
    const number = 2000;
    setTimeout(() => {
      setVisible(false);
    }, number);
  };

  const filterDrinks = () => {
    const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filtered = compRecipe.filter((recip) => recip.type === 'drink');
    setCompletedRecipes(filtered);
  };

  const filterFood = () => {
    const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filtered = compRecipe.filter((recip) => recip.type === 'meal');
    setCompletedRecipes(filtered);
  };

  const clearFilters = () => {
    const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setCompletedRecipes(compRecipe);
  };

  return (
    <>
      <Header name="Receitas Feitas" show="false" />
      <div>
        <ToastContainer visible={ visible } />
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ clearFilters }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ filterFood }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ filterDrinks }
          >
            Drinks
          </button>
        </div>
        {completedRecipes.map((recipes, index) => (
          <div key={ index } className="card">
            <Link to={ `/${recipes.type}s/${recipes.id}` }>
              <div>
                <img
                  src={ recipes.image }
                  alt="recipes"
                  data-testid={ `${index}-horizontal-image` }
                />
              </div>
            </Link>
            <div>
              <div
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipes.nationality} - ${recipes.category}`}
              </div>
              <Link to={ `/${recipes.type}s/${recipes.id}` }>
                <h5
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipes.name }
                </h5>
              </Link>
              {recipes.tags.map((tag) => (
                <span
                  className="badge rounded-pill bg-info text-dark"
                  key={ `${tag}-${index}` }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))}
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                onClick={ () => shareRecipe(recipes.id, recipes.type) }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="heart icon" />
              </button>
              <span
                style={ { display: recipes.type === 'meal' ? null : 'none' } }
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipes.alcoholicOrNot}
              </span>
              <div
                data-testid={ `${index}-horizontal-done-date` }
              >
                Feito em:
                { recipes.doneDate }
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default DoneRecipes;
