import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import Routes from './components/Routes';
import LoginProvider from './context/LoginProvider';
import SearchProvider from './context/SearchProvider';
import RecipesProvider from './context/RecipesProvider';
import DoneRecipesProvider from './context/DoneRecipesProvider';
import CategoriesProvider from './context/CategoriesProvider';

function App() {
  return (
    <LoginProvider>
      <ToastContainer />
      <RecipesProvider>
        <DoneRecipesProvider>
          <SearchProvider>
            <CategoriesProvider>
              <Routes />
            </CategoriesProvider>
          </SearchProvider>
        </DoneRecipesProvider>
      </RecipesProvider>
    </LoginProvider>
  );
}

export default App;
