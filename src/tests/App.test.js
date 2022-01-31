import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('1 - Testa o componente App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(home).toBeInTheDocument();

    const About = screen.getByRole('link', {
      name: /About/i,
    });
    expect(About).toBeInTheDocument();

    const favorites = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favorites).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: /Home/i,
    }));
  });

  it('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    /* poderia usar também o window.location  */
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação éredirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('anything');
    const found = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(found).toBeInTheDocument();
  });
});
