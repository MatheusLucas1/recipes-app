import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import { doneRecipes } from './helpers/mocks/doneRecipes';

describe('Testa o componente Header', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  test('Testa se os componentes da página de receitas prontas são exibidos adequadamente na tela de Drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getAllByTestId('0-horizontal-top-text')[0]).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('0-Curry-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.getAllByTestId('1-horizontal-top-text')[0]).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-done-date')).toBeInTheDocument();
  });
});
