import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './index';

test('renders search button', () => {
  render(<App />);
  const searchElement = screen.getByText(/search/i);
  expect(searchElement).toBeInTheDocument();
});
