import PropTypes from 'prop-types';
import { useMemo, useCallback, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import DoneRecipesContext from './DoneRecipesContext';

function DoneRecipesProvider({ children }) {
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function setMock() {
      const recipes = [
        {
          id: '52771',
          type: 'meal',
          nationality: 'Italian',
          category: 'Vegetarian',
          alcoholicOrNot: '',
          name: 'Spicy Arrabiata Penne',
          image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
          doneDate: '23/06/2020',
          tags: ['Pasta', 'Curry'],
        },
        {
          id: '178319',
          type: 'drink',
          nationality: '',
          category: 'Cocktail',
          alcoholicOrNot: 'Alcoholic',
          name: 'Aquamarine',
          image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
          doneDate: '23/06/2020',
          tags: [],
        },
      ];
      localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    }
    setMock();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setCompletedRecipes(doneRecipes);
  }, []);

  const shareRecipe = useCallback((id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setVisible(true);
    const number = 2000;
    setTimeout(() => {
      setVisible(false);
    }, number);
  }, []);

  const handleFilterFoods = useCallback(() => {
    const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filtered = compRecipe.filter((recip) => recip.type === 'meal');
    setCompletedRecipes(filtered);
  }, []);

  const handleFilterDrinks = useCallback(() => {
    const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filtered = compRecipe.filter((recip) => recip.type === 'drink');
    setCompletedRecipes(filtered);
  }, []);

  const handleClearFilters = useCallback(() => {
    const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setCompletedRecipes(compRecipe);
  }, []);

  const contextValue = useMemo(() => ({
    completedRecipes,
    visible,
    setVisible,
    shareRecipe,
    handleFilterDrinks,
    handleFilterFoods,
    handleClearFilters,
  }), [completedRecipes,
    visible,
    setVisible,
    shareRecipe,
    handleClearFilters,
    handleFilterDrinks,
    handleFilterFoods]);

  return (
    <DoneRecipesContext.Provider value={ contextValue }>
      { children }
    </DoneRecipesContext.Provider>
  );
}

DoneRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoneRecipesProvider;
