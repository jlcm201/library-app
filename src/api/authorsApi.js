const BASE_URL = 'https://localhost:7277/Authors';

export const getAuthors = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      return { ok: false, error: 'Failed to fetch authors' };
    }
  
    return { ok: true, data: await response.json() };
  } catch(error) {
    return { ok: false, error };
  }
};
