import { createContext, useState } from 'react';
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  let [searchResults, setSearchResults] = useState();
  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
