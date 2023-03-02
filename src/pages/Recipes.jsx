import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function Recipes({ title = 'Meals' }) {
  return (
    <div>
      Recipes
      <Header title={ title } />
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string,
};
