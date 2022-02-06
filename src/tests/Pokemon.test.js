import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const name = screen.getByText(/pikachu/i);
    expect(name).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');

    const weight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(weight).toBeInTheDocument();

    const image = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(link);

    const favorite = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favorite);

    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const starIcon = screen.getAllByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(starIcon[0]).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon[0]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
