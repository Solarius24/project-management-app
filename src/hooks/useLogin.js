import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export const useLogin = () => {
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setError(null);

    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password);

      //update online status

      const ref = doc(db, "users", res.user.uid);
      await updateDoc(ref, {
        online: true,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return { login, error };
};
