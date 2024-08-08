const BASE_URL = 'https://localhost:7277/LibraryLoan';

export const createLibraryLoan = async (loan) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loan),
    });
  
    if (!response.ok) {
      return { ok: false, error: 'Failed to create Library loan' };
    }
    return { ok: true, data: await response.json() };
  } catch (error) {
    return { ok: false, error };
  }
};

export const GetLibraryLoansByUserId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${id}`);
  
    if (!response.ok) {
      return { ok: false, error: 'Failed to fetch Library loans by userId' };
    }
    return { ok: true, data: await response.json() };
  } catch (error) {
    return { ok: false, error };
  }
};

export const deleteLibraryLoan = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      return { ok: false, error: 'Failed to delete library loan' };
    }
    return { ok: true, data: await {} };
  } catch (error) {
    return { ok: false, error };
  }
};
