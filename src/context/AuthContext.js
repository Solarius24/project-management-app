
//hooks
import { createContext, useEffect, useState, useContext } from "react";
//functions
import { auth } from "../firebase/config";

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false)
    });
    return unsubscribe;
  }, [currentUser]);

const value = {
  currentUser
}
console.log(value)

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
