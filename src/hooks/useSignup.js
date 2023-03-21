import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [error, setError] = useState(null);

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      //Upload thumbnaill
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = ref(storage, uploadPath);
      await uploadBytes(img, thumbnail);
      const imgUrl = await getDownloadURL(img);

      //Add display name to user
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: imgUrl,
      });

      //create user document

      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName,
        photoURL: imgUrl,
      });
    } catch (err) {
      setError(err.message);
    }
  };
  return { signup, error };
};
