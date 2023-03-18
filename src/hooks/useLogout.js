import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPendingLogout, setIsPendingLogout] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    console.log("logout called")
    setError(null);
    setIsPendingLogout(true);
  

    try {
      //update online status
      const { uid } = user;
      const ref = doc(db, "users", uid);
      await updateDoc(ref, {
        online: false,
      });

      //sign user out
      const auth = getAuth();
      await signOut(auth);

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      //update state
      if (!isCancelled) {
        setIsPendingLogout(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPendingLogout(false);
      }
    }
  };

  useEffect(() => {
    console.log("useEffect")
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPendingLogout };
};
