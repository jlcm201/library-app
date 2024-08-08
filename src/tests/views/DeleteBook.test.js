import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeleteBook } from '../../views/DeleteBook';
import { AppProvider } from '../../context/AppContext';

const renderWithProvider = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <AppProvider {...providerProps}>{ui}</AppProvider>,
    renderOptions
  );
};

describe('DeleteBook Component', () => {
  test('renders the form with all fields', () => {
    renderWithProvider(<DeleteBook />);

    expect(screen.getByLabelText(/Libro/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Eliminar'})).toBeInTheDocument();
  });

  test('enabled delete button with correct data', async () => {
    renderWithProvider(<DeleteBook />, {
      providerProps: { initialValue: { books: [{id: '01', title: 'El señor de los anillos'}] } }
    });

    expect(screen.getByRole('button', {name: 'Eliminar'})).toBeDisabled();

    fireEvent.mouseDown(screen.getByRole('combobox', {name: 'Libro'}));
    await waitFor(() => { expect(screen.getByText(/El señor de los anillos/i)).toBeInTheDocument(); });
    fireEvent.click(screen.getByRole('option', {name: 'El señor de los anillos'}));

    expect(screen.getByRole('button', {name: 'Eliminar'})).not.toBeDisabled();
  });
});
