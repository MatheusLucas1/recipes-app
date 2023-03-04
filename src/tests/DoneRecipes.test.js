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
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
  });

  test('Testa se os componentes da página de receitas prontas são exibidos adequadamente na tela de Drinks', async () => {
    const foodImage = await screen.findByTestId('0-horizontal-image');
    const foodName = await screen.findByTestId('0-horizontal-name');
    const foodInfo = await screen.findAllByTestId('0-horizontal-top-text');
    const foodDoneDate = await screen.findByTestId('0-horizontal-done-date');
    const foodFirstTag = await screen.findByTestId('0-Pasta-horizontal-tag');
    const shareButton = await screen.findByTestId('0-horizontal-share-btn');

    expect(foodImage).toBeInTheDocument();
    expect(foodName).toBeInTheDocument();
    expect(foodInfo[0].innerHTML)
      .toBe(`${doneRecipes[0].nationality} - ${doneRecipes[0].category}`);
    expect(foodDoneDate).toBeInTheDocument();
    expect(foodFirstTag.innerHTML).toBe(doneRecipes[0].tags[0]);
    expect(shareButton).toBeInTheDocument();
  });

  test('Testa se apenas aparecem comidas ao clicar no botão de filtro "Food"', async () => {
    const foodFilterBtn = await screen.findByTestId('filter-by-meal-btn');
    const foodName = await screen.findByRole('heading', { level: 5, name: /Spicy Arrabiata Penne/i });
    const drinkName = await screen.findByRole('heading', { level: 5, name: /Aquamarine/i });

    expect(foodName).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();

    userEvent.click(foodFilterBtn);

    expect(foodName).toBeInTheDocument();
    expect(drinkName).not.toBeInTheDocument();
  });

  test('Testa se apenas aparecem bebidas ao clicar no botão de filtro "Drinks"', async () => {
    const drinkFilterBtn = await screen.findByTestId('filter-by-drink-btn');

    const foodName = await screen.findByRole('heading', { level: 5, name: /Spicy Arrabiata Penne/i });

    const drinkName = await screen.findByRole('heading', { level: 5, name: /aquamarine/i });

    expect(foodName).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();

    userEvent.click(drinkFilterBtn);

    expect(foodName).not.toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
  });

  test('Testa se os filtros são limpos ao clicar em "All"', async () => {
    const drinkFilterBtn = await screen.findByTestId('filter-by-drink-btn');

    const clearFiltersBtn = await screen.findByTestId('filter-by-all-btn');

    const foodName = await screen.findByRole('heading', { level: 5, name: /Spicy Arrabiata Penne/i });

    const drinkName = await screen.findByRole('heading', { level: 5, name: /aquamarine/i });

    expect(foodName).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();

    userEvent.click(drinkFilterBtn);

    expect(foodName).not.toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();

    userEvent.click(clearFiltersBtn);

    expect(foodName).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
  });

  // test('Testa ao clicar para compartilhar a rota da receita, o endereço é copiado para o clipboard', async () => {
  //   const shareBtn = await screen.findByTestId('0-horizontal-share-btn');

  //   expect(shareBtn).toBeInTheDocument();

  //   userEvent.click(shareBtn);

  //   expect(screen.findByText('Link copied!')).toBeInTheDocument();
  // });
});
