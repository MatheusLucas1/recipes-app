import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title = 'Header', showSearch = true }) {
  const history = useHistory();

  const handleClickProfile = () => {
    history.push('/profile');
  };

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button type="button" onClick={ handleClickProfile }>
        <img src={ profileIcon } alt="Ícone de Perfil" data-testid="profile-top-btn" />
      </button>
      {
        showSearch && (
          <button type="button">
            <img src={ searchIcon } alt="Ícone de Busca" data-testid="search-top-btn" />
          </button>
        )
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  showSearch: PropTypes.bool,
};
