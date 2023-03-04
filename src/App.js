import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';
import LoginProvider from './context/LoginProvider';
import SearchProvider from './context/SearchProvider';
import RecipesProvider from './context/RecipesProvider';
import DoneRecipesProvider from './context/DoneRecipesProvider';

function App() {
  return (
    <LoginProvider>
      <RecipesProvider>
        <DoneRecipesProvider>
          <SearchProvider>
            <Routes />
          </SearchProvider>
        </DoneRecipesProvider>
      </RecipesProvider>
    </LoginProvider>
  );
}

export default App;
