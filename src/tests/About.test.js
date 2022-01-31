import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { About } from '../components';

describe(' Teste o componente <About.js />', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const infos = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(infos).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const title = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });

    expect(title).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragrafos = screen.getAllByText(/pokémons/i);
    expect(paragrafos).toHaveLength(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const imagem = screen.getByRole('img', {
      name: /Pokédex/i,
    });

    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('alt', 'Pokédex');
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
