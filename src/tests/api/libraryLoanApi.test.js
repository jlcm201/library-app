import { createLibraryLoan, deleteLibraryLoan, GetLibraryLoansByUserId } from '../../api/libraryLoanApi';
import fetchMock from 'jest-fetch-mock';

const BASE_URL = 'https://localhost:7277/LibraryLoan';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Library Loan API', () => {
  test('creates a loan successfully', async () => {
    const newLoan = { id: '01', bookId: '01', userId: '01', categoryId: '01', authorId: '01' };
    fetchMock.mockResponseOnce(JSON.stringify(newLoan));

    const response = await createLibraryLoan(newLoan);
    expect(response).toEqual({ok: true, data: newLoan});
    expect(fetchMock).toHaveBeenCalledWith(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLoan),
    });
  });

  test('error when creating a loan fails', async () => {
    fetchMock.mockReject(() => Promise.reject(new Error('Failed to create loan')));

    const response = await createLibraryLoan({});
    await expect(response.ok).toBe(false);
  });

  test('fetches library loans by userId successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: '01', bookId: 'BId01' }]));

    const libraryLoans = await GetLibraryLoansByUserId('UId01');
    expect(libraryLoans).toEqual({ok: true, data: [{ id: '01', bookId: 'BId01' }]});
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/user/UId01`);
  });

  test('error when fetching library loans by userId fails', async () => {
    fetchMock.mockReject(() => Promise.reject('Failed to fetch'));

    const libraryLoans = await GetLibraryLoansByUserId('BId01');
    await expect(libraryLoans.ok).toBe(false);
  });

  test('deletes a loan successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    const response = await deleteLibraryLoan('01');
    expect(response).toEqual({ok: true, data: {}});
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/01`, {
      method: 'DELETE',
    });
  });

  test('error when deleting a loan fails', async () => {
    fetchMock.mockReject(() => Promise.reject(new Error('Failed to delete loan')));

    const response = await deleteLibraryLoan('01');
    await expect(response.ok).toBe(false);
  });
});
