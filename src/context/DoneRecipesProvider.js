import PropTypes from 'prop-types';
import { useMemo, useCallback } from 'react';
import DoneRecipesContext from './DoneRecipesContext';

function DoneRecipesProvider({ children }) {
  const handleMock = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const json = await response.json();
      const { meals } = json;
      return meals;
    } catch (error) {
      toast.error(error);
    }
  };

  const mock = handleMock();

  const contextValue = useMemo(() => ({
    mock,
  }), [mock]);

  return (
    <DoneRecipesContext.Provider value={ contextValue }>
      { children }
    </DoneRecipesContext.Provider>
  );
}

DoneRecipesProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default DoneRecipesProvider;
