import PropTypes from 'prop-types';
import React from 'react';

export default function RecipeCard({ id, name, image }) {
  return (
    <div data-testid={ `${id}-recipe-card` }>
      <img src={ image } alt={ name } data-testid={ `${id}-card-img` } />
      <p data-testid={ `${id}-card-name` }>{name}</p>
    </div>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string,
}.isRequired;
