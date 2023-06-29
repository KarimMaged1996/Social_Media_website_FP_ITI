import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null)
  const [groups , setGroups] = useState(null)

  return(

  <AuthContext.Provider value={{user,setUser,groups,setGroups}}>
    {children}
  </AuthContext.Provider>
  );
};


