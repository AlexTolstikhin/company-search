import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';


test('renders Search... button', () => {
  const { getByText } = render(<App />);
  const searchLabel = getByText("Search...");
  expect(searchLabel).toBeInTheDocument();
});

test('renders Search... button', () => {
  const { getByTestId } = render(<App />);
  const searchLabel = getByTestId("input-element");
  expect(searchLabel).toBeInTheDocument();
});