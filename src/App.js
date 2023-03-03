import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';
import LoginProvider from './context/LoginProvider';
import SearchProvider from './context/SearchProvider';

function App() {
  return (
    <LoginProvider>
      <SearchProvider>
        <Routes />
      </SearchProvider>
    </LoginProvider>
  );
}

export default App;
