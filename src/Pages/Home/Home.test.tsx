import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './../../App';

test('renders title element', () => {
  render(<App />);
  const exploreButton = screen.getByText(/Let's cook something together/i);
  expect(exploreButton).toBeInTheDocument();
});
