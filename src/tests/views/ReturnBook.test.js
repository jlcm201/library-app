import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { ReturnBook } from '../../views/ReturnBook';
import { AppProvider } from '../../context/AppContext';

const BASE_URL = 'https://localhost:7277/LibraryLoan';

const renderWithProvider = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <AppProvider {...providerProps}>{ui}</AppProvider>,
    renderOptions
  );
};

describe('ReturnBook Component', () => {
  test('renders the form with all fields', () => {
    renderWithProvider(<ReturnBook />);

    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Libro/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Devolver Libro'})).toBeInTheDocument();
  });

  test('enabled delete button with correct data', async () => {
    fetchMock.get(`${BASE_URL}/user/U01`, {
      status: 200,
      body: [{ id: 'L01', userId: 'U01', bookId: 'B01' }]
    });

    renderWithProvider(<ReturnBook />, {
      providerProps: { initialValue: { 
        books: [{id: 'B01', title: 'El señor de los anillos'}],
        users: [{id: 'U01', name: 'Cruz, José Luis'}]
      }}
    });

    expect(screen.getByRole('button', {name: 'Devolver Libro'})).toBeDisabled();

    fireEvent.mouseDown(screen.getByRole('combobox', {name: 'Usuario'}));
    await waitFor(() => { expect(screen.getByText(/Cruz, José Luis/i)).toBeInTheDocument(); });
    fireEvent.click(screen.getByRole('option', {name: 'Cruz, José Luis'}));

    fireEvent.mouseDown(screen.getByRole('combobox', {name: 'Libro'}));
    await waitFor(() => { expect(screen.getByText(/El señor de los anillos/i)).toBeInTheDocument(); });
    fireEvent.click(screen.getByRole('option', {name: 'El señor de los anillos'}));

    expect(screen.getByRole('button', {name: 'Devolver Libro'})).not.toBeDisabled();
  });
});
