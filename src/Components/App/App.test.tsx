import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './index';

test('renders title element', () => {
  render(<App />);
  const titleElement = screen.getByText(/Fud/i);
  expect(titleElement).toBeInTheDocument();
});
