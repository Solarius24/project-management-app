import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("use AuthContext must be inside auth context provider");
  }
  return context;
};

export default useAuthContext;
