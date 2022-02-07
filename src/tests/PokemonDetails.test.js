import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const detailsHead = screen.getByRole('heading', { name: /pikachu details/i });
    expect(detailsHead).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();

    const detailsSumary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(detailsSumary).toBeInTheDocument();

    const fixLint = 'hard berries with electricity to make them tender enough to eat.';
    const detailsResume = screen.getByText(`This intelligent Pokémon roasts ${fixLint}`);
    expect(detailsResume).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas', () => {
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const gameLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(gameLocation).toBeInTheDocument();

    const PikachuLoc = screen.getAllByAltText(/Pikachu location/i);
    expect(PikachuLoc).toHaveLength(2);

    const locOne = screen.getByText(/kanto viridian forest/i);
    expect(locOne).toBeInTheDocument();

    const locTwo = screen.getByText(/kanto power plant/i);
    expect(locTwo).toBeInTheDocument();

    const images = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(images[0]).toBeInTheDocument();
    expect(images[0]).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    expect(images[1]).toBeInTheDocument();
    expect(images[1]).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const clickFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(clickFavorite).toBeInTheDocument();

    const favorite = 'Pikachu is marked as favorite';
    expect(screen.queryByAltText(favorite)).toBe(null);
    userEvent.click(clickFavorite);
    expect(screen.queryByAltText(favorite)).toBeInTheDocument();
    userEvent.click(clickFavorite);
    expect(screen.queryByAltText(favorite)).toBe(null);
    userEvent.click(clickFavorite);
    expect(screen.queryByAltText(favorite)).toBeInTheDocument();
  });
});
