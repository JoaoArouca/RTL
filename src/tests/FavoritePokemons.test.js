import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const check = screen.getByRole('checkbox', { id: 'favorite' });
    userEvent.click(check);

    const favorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favorites);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(/Pikachu/i);
  });
});
