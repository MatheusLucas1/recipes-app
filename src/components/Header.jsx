import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showSearch = true }) {
  const history = useHistory();
  const { visible, setVisible } = useContext(SearchContext);

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
          <button type="button" onClick={ () => setVisible(!visible) }>
            <img src={ searchIcon } alt="Ícone de Busca" data-testid="search-top-btn" />
          </button>
        )
      }
      {
        visible && (
          <label htmlFor="search-input">
            Busca
            <input
              type="text"
              name="searchInput"
              id="search-input"
              data-testid="search-input"
            />
          </label>
        )
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool,
};

export default Header;
