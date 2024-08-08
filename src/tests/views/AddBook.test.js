import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddBook } from '../../views/AddBook';
import { AppProvider } from '../../context/AppContext';

const renderWithProvider = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <AppProvider {...providerProps}>{ui}</AppProvider>,
    renderOptions
  );
};

describe('AddBook Component', () => {
  test('renders the form with all fields', () => {
    renderWithProvider(<AddBook />);

    expect(screen.getByLabelText(/Titulo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Autor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Guardar'})).toBeInTheDocument();
  });

  test('enabled save button with correct data', async () => {
    renderWithProvider(<AddBook />, {
      providerProps: { 
        initialValue: { 
          authors: [{id: '01', name: 'J.R.R. Tolkien'}], 
          categories: [{id: '01', name: 'Fantasía'}]
        } 
      }
    });

    fireEvent.change(screen.getByRole('textbox', {name: 'Titulo'}), { target: { value: 'El señor de los anillos' } });
    fireEvent.change(screen.getByRole('textbox', {name: 'Descripción'}), 
      { target: { value: 'Una épica trilogía que sigue la misión de un grupo de héroes para destruir un anillo maligno y salvar la Tierra Media de la oscuridad.' } });

    expect(screen.getByRole('button', {name: 'Guardar'})).toBeDisabled();

    fireEvent.mouseDown(screen.getByRole('combobox', {name: 'Autor'}));
    await waitFor(() => { expect(screen.getByText(/J.R.R. Tolkien/i)).toBeInTheDocument(); });
    fireEvent.click(screen.getByRole('option', {name: 'J.R.R. Tolkien'}));

    fireEvent.mouseDown(screen.getByRole('combobox', {name: 'Categoria'}));
    await waitFor(() => { expect(screen.getByText(/Fantasía/i)).toBeInTheDocument(); });
    fireEvent.click(screen.getByRole('option', {name: 'Fantasía'}));

    fireEvent.change(screen.getByRole('spinbutton', {name: 'Copias'}), { target: { value: 2 } });

    expect(screen.getByRole('button', {name: 'Guardar'})).not.toBeDisabled();
  });
});
