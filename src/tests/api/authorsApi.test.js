import { getAuthors } from '../../api/authorsApi';
import fetchMock from 'jest-fetch-mock';

const BASE_URL = 'https://localhost:7277/Authors';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Authors API', () => {
  test('fetches authors successfully', async () => {
    const mockAuthors = [
      { id: '01', name: 'Autor 1' },
      { id: '02', name: 'Autor 2' },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockAuthors));

    const authors = await getAuthors();
    expect(authors).toEqual({ok: true, data: mockAuthors});
    expect(fetchMock).toHaveBeenCalledWith(BASE_URL);
  });

  test('error when fetching authors fails', async () => {
    fetchMock.mockReject(() => Promise.reject(new Error('Failed to fetch authors')));

    const authors = await getAuthors();
    await expect(authors.ok).toBe(false);
  });
});
