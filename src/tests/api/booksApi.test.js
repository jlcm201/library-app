import { getBooks, addBook, deleteBook } from '../../api/booksApi';
import fetchMock from 'jest-fetch-mock';

const BASE_URL = 'https://localhost:7277/Books';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetch.resetMocks();
});

describe('Books API', () => {
  test('fetches books successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: '01', title: 'Libro 1' }]));

    const books = await getBooks();
    expect(books).toEqual({ok: true, data: [{ id: '01', title: 'Libro 1' }]});
    expect(fetchMock).toHaveBeenCalledWith(BASE_URL);
  });

  test('error when fetching books fails', async () => {
    fetchMock.mockReject(() => Promise.reject('Failed to fetch'));

    const books = await getBooks();
    await expect(books.ok).toBe(false);
  });

  test('adds a book successfully', async () => {
    const newBook = { title: 'Nuevo Libro' };
    fetchMock.mockResponseOnce(JSON.stringify(newBook));

    const book = await addBook(newBook);
    expect(book).toEqual({ok: true, data: newBook});
    expect(fetchMock).toHaveBeenCalledWith(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });
  });

  test('error when adding a book fails', async () => {
    fetchMock.mockReject(() => Promise.reject('Failed to add'));

    const book = await addBook({});
    await expect(book.ok).toBe(false);
  });

  test('deletes a book successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    await deleteBook('01');
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/01`, {
      method: 'DELETE',
    });
  });

  test('error when deleting a book fails', async () => {
    fetchMock.mockReject(() => Promise.reject('Failed to delete'));

    const deletedBook = await deleteBook('01');
    await expect(deletedBook.ok).toBe(false);
  });
});
