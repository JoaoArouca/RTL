import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      const text = screen.getByRole('heading', {
        name: /page/i,
      });
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent(/Page requested not found/i);
    });

  it('Teste se página mostra a imagem', () => {
    const img = screen.getByRole('img', {
      name: /pikachu/i,
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
