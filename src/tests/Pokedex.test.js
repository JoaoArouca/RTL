import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

const PokeID = 'pokemon-name';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const pokedex = screen.getAllByTestId(PokeID);
    expect(pokedex).toHaveLength(1);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const button = screen.getByRole('button', { name: /All/i });
    expect(button).toBeInTheDocument();

    userEvent.click(button);
  });

  it('Teste se é exibido o próximo Pokémon da lista', () => {
    const button = screen.getByTestId('next-pokemon');

    pokemons.forEach((pokemon) => {
      const poke = screen.getByTestId(PokeID);
      expect(poke).toHaveTextContent(pokemon.name);

      userEvent.click(button);
      /* pula para o próximo pokemon */
    });

    const secondPoke = screen.getByTestId(PokeID);
    expect(secondPoke).toHaveTextContent(pokemons[0].name);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const filtros = pokemons.reduce((acc, current) => {
      if (!acc.includes(current.type)) {
        acc.push(current.type);
        return acc;
      }
      return acc;
    }, []);

    filtros.forEach((filtro) => {
      const pokeType = screen.getByRole('button', { name: filtro });

      expect(pokeType).toHaveTextContent(filtro);
    });
    const pokeType = screen.getAllByTestId('pokemon-type-button');
    expect(pokeType).toHaveLength(filtros.length);
  });

  it('Teste se clicando num botão, a navegação se limita ao tipo', () => {
    const pokeFiltereds = pokemons.filter((poke) => poke.type === 'Fire');

    const fireBtn = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(fireBtn);
    const nextButton = screen.getByTestId('next-pokemon');
    pokeFiltereds.forEach((poke) => {
      const pokeName = screen.getByTestId(PokeID);
      expect(pokeName).toHaveTextContent(poke.name);
      userEvent.click(nextButton);
    });
  });
});
