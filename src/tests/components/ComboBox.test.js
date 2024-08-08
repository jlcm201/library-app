import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import { ComboBox } from '../../components/ComboBox';

test('renders ComboBox and selects an option', async () => {
  const options = [
    { id: '01', value: 'Option 1' },
    { id: '02', value: 'Option 2' }
  ];

  const handleChange = jest.fn();

  await act(async () => {
    render(
      <ComboBox
        options={options}
        value="01"
        onChange={handleChange}
        label="Selecciona una opción"
      />
    );
  });

  expect(screen.getAllByText(/Selecciona una opción/i).length).toBe(2);

  fireEvent.mouseDown(screen.getByRole('combobox'));

  expect(screen.getAllByText('Option 1').length).toBe(2);
  expect(screen.getByText('Option 2')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Option 2'));

  expect(handleChange).toHaveBeenCalled();
});
