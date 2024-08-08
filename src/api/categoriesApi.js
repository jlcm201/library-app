const BASE_URL = 'https://localhost:7277/Categories';

export const getCategories = async () => {
  try {
    const response = await fetch(BASE_URL);
  
    if (!response.ok) {
      return { ok: false, error: 'Failed to fetch categories' };
    }
  
    return { ok: true, data: await response.json() };
  } catch (error) {
    return { ok: false, error };
  }
};
