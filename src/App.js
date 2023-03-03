import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';
import LoginProvider from './context/LoginProvider';
import SearchProvider from './context/SearchProvider';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <LoginProvider>
      <RecipesProvider>
        <SearchProvider>
          <Routes />
        </SearchProvider>
      </RecipesProvider>
    </LoginProvider>
  );
}

export default App;
