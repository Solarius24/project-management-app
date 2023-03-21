import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import {useAuthContext} from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useLogout = () => {
  const [error, setError] = useState(null);

  const currentUser  = useAuthContext();

  const logout = async () => {
    setError(null);

    try {
      //update online status
      const { uid } = currentUser;
      const ref = doc(db, "users", uid);
      await updateDoc(ref, {
        online: false,
      });

      //sign user out
      const auth = getAuth();
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  return { logout, error };
};
