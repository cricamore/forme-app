import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Home_user from './src/pages/Home_user';
import '@testing-library/jest-dom/extend-expect';

describe('Home_User', () => {
  test('renders without errors', () => {
    act(() => {
      render(<Home_user />);
    });

    // Verificar si el componente principal se renderizó correctamente
    const homeUserElement = screen.getByTestId('home-user');
    expect(homeUserElement).toBeInTheDocument();
  });

  test('renders filter button', () => {
    act(() => {
      render(<Home_user />);
    });

    // Verificar si el componente del botón filtrar está renderizado correctamente
    const filterButtonElement = screen.getByRole('button', { name: 'Filtrar' });
    expect(filterButtonElement).toBeInTheDocument();
  });

  test('renders initial empty workers', () => {
    act(() => {
      render(<Home_user />);
    });

    const workersElements = screen.queryAllByTestId('worker');
    expect(workersElements.length).toBe(0);
  });
});

