import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('Renders form filds', () => {
  render(<App />);
  const sizeX = screen.getByText(/Size X/i);
  const sizeY = screen.getByText(/Size Y/i);
  const posX = screen.getByText(/Position X/i);
  const posY = screen.getByText(/Position Y/i);
  const direction = screen.getByText(/Direction/i);
  const path = screen.getByText(/Path/i);
  const addButton = screen.getByRole('button', { name: /Add Mower/i })
  const calculateButton = screen.getByRole('button', { name: /Calculate/i })

  expect(sizeX).toBeInTheDocument();
  expect(sizeY).toBeInTheDocument();
  expect(posX).toBeInTheDocument();
  expect(posY).toBeInTheDocument();
  expect(direction).toBeInTheDocument();
  expect(path).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
  expect(calculateButton).toBeInTheDocument();
});

test('Fill form filds', () => {
  render(<App />);
  const sizeX = screen.getByLabelText(/Size X/i);
  fireEvent.change(sizeX, { target: { value: '100' } })
  const sizeXFinded = screen.getByDisplayValue('100')
  expect(sizeXFinded).toBeInTheDocument();

  const sizeY = screen.getByLabelText(/Size Y/i);
  fireEvent.change(sizeY, { target: { value: '150' } })
  const sizeYFinded = screen.getByDisplayValue('150')
  expect(sizeYFinded).toBeInTheDocument();

  const posX = screen.getByLabelText(/Position X/i);
  fireEvent.change(posX, { target: { value: '50' } })
  const posXFinded = screen.getByDisplayValue('50')
  expect(posXFinded).toBeInTheDocument();

  const posY = screen.getByLabelText(/Position Y/i);
  fireEvent.change(posY, { target: { value: '60' } })
  const posYFinded = screen.getByDisplayValue('60')
  expect(posYFinded).toBeInTheDocument();

  const direction = screen.getByLabelText(/Direction/i);
  fireEvent.change(direction, { target: { value: 'S' } })
  const directionFinded = screen.getByDisplayValue('S')
  expect(directionFinded).toBeInTheDocument();

  const path = screen.getByLabelText(/Path/i);
  fireEvent.change(path, { target: { value: 'MMM' } })
  const pathFinded = screen.getByDisplayValue('MMM')
  expect(pathFinded).toBeInTheDocument();
});

test('Validate form filds', () => {
  render(<App />);
  const blankTextNoExists = screen.queryByText(/Cannot be blank!/i);
  expect(blankTextNoExists).toBeNull();

  const calculateButton = screen.getByRole('button', { name: /Calculate/i })
  fireEvent.click(calculateButton)

  const blankTextExists = screen.queryByText(/Cannot be blank!/i);
  expect(blankTextExists).not.toBeNull();

  const path = screen.getByLabelText(/Path/i)
  fireEvent.change(path, { target: { value: 'ASD' } })
  fireEvent.click(calculateButton)
  const errorTextExists = screen.queryByText(/Only the letters L,R,M are allowed!/i);
  expect(errorTextExists).not.toBeNull();
});