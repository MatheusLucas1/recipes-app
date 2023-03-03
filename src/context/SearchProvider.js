import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import SearchContext from './SearchContext';

function SearchProvider({ children }) {
  const [visible, setVisible] = useState(false);

  const contextValue = useMemo(() => ({
    visible, setVisible,
  }), [visible]);

  return (
    <SearchContext.Provider value={ contextValue }>
      { children }
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default SearchProvider;
