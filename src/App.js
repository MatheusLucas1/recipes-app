import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';
import LoginProvider from './context/LoginProvider';

function App() {
  return (
    <LoginProvider>
      <Routes />
    </LoginProvider>
  );
}

export default App;
