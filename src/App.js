import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';
import LoginProvider from './context/LoginProvider';
import SearchProvider from './context/SearchProvider';
import RecipesProvider from './context/RecipesProvider';
import CategoriesProvider from './context/CategoriesProvider';

function App() {
  return (
    <LoginProvider>
      <RecipesProvider>
        <SearchProvider>
          <CategoriesProvider>
            <Routes />
          </CategoriesProvider>
        </SearchProvider>
      </RecipesProvider>
    </LoginProvider>
  );
}

export default App;
