import { getUsers } from '../../api/usersApi';
import fetchMock from 'jest-fetch-mock';

const BASE_URL = 'https://localhost:7277/Users';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Users API', () => {
  test('fetches users successfully', async () => {
    const mockUsers = [
      { id: '01', name: 'Cruz, José Luis' },
      { id: '02', name: 'Lima, Angélica' },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

    const users = await getUsers();
    expect(users).toEqual({ok: true, data: mockUsers});
    expect(fetchMock).toHaveBeenCalledWith(BASE_URL);
  });

  test('error when fetching users fails', async () => {
    fetchMock.mockReject(() => Promise.reject(new Error('Failed to fetch users')));

    const users = await getUsers();
    await expect(users.ok).toBe(false);
  });
});
