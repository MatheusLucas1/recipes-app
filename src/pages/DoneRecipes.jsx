import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import ToastContainer from './ToastContainer';
import DoneRecipesContext from '../context/DoneRecipesContext';

function DoneRecipes() {
  const { completedRecipes,
    visible,
    shareRecipe,
    handleClearFilters,
    handleFilterDrinks,
    handleFilterFoods } = useContext(DoneRecipesContext);
  return (
    <>
      <Header name="Receitas Feitas" show="false" />
      <div>
        <ToastContainer visible={ visible } />
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleClearFilters }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ handleFilterFoods }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ handleFilterDrinks }
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
