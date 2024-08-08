import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ 
  children, 
  initialValue = { authors: [], categories: [], books: [], users: [] } }
) => {
  const [globalState, setState] = useState({ 
    lstAuthors: initialValue.authors, 
    lstCategories: initialValue.categories,
    lstBooks: initialValue.books,
    lstUsers: initialValue.users
  });

  const setLstAuthors = (authors) => setState((prevState) => ({ ...prevState, lstAuthors: authors }));
  const setLstCategories = (categories) => setState((prevState) => ({ ...prevState, lstCategories: categories }));
  const setLstBooks = (books) => setState((prevState) => ({ ...prevState, lstBooks: books }));
  const setLstUsers = (users) => setState((prevState) => ({ ...prevState, lstUsers: users }));

  return (
    <AppContext.Provider 
      value={{ globalState, setLstAuthors, setLstCategories, setLstBooks, setLstUsers }}
    >
      {children}
    </AppContext.Provider>
  );
};
