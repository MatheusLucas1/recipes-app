import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const saveEmail = localStorage.getItem('user');
  const checkEmail = JSON.parse(saveEmail);

  return (
    <div>
      <Header />
      <div>
        <h1 data-testid="profile-email">{ checkEmail.email }</h1>
        <Link to="/done-recipes">
          <button data-testid="profile-done-btn">Done Recipes</button>
        </Link>
        <Link to="/favorite-recipes">
          <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        </Link>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;
