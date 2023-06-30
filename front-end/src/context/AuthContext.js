import { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null)

  return(

  <AuthContext.Provider value={{user,setUser}}>
    {children}
  </AuthContext.Provider>
  );
};
