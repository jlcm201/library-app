const BASE_URL = 'https://localhost:7277/Books';

export const getBooks = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      return { ok: false, error: 'Failed to fetch books' };
    }
    return { ok: true, data: await response.json() };
  } catch (error) {
    return { ok: false, error };
  }
};

export const addBook = async (book) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      return { ok: false, error: 'Failed to add book' };
    }
    return { ok: true, data: await response.json() };
  } catch (error) {
    return { ok: false, error };
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      return { ok: false, error: 'Failed to delete book' };
    }
    return { ok: true, data: {} };
  } catch (error) {
    return { ok: false, error };
  }
};
