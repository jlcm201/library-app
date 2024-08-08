import { getCategories } from '../../api/categoriesApi';
import fetchMock from 'jest-fetch-mock';

const BASE_URL = 'https://localhost:7277/Categories';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Categories API', () => {
  test('fetches categories successfully', async () => {
    const mockCategories = [
      { id: '01', name: 'Fantasía' },
      { id: '02', name: 'Ficción' },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockCategories));

    const categories = await getCategories();
    expect(categories).toEqual({ok: true, data: mockCategories});
    expect(fetchMock).toHaveBeenCalledWith(BASE_URL);
  });

  test('error when fetching categories fails', async () => {
    fetchMock.mockReject(() => Promise.reject(new Error('Failed to fetch categories')));

    const categories = await getCategories();
    await expect(categories.ok).toBe(false);
  });
});
