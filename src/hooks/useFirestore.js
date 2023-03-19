import { useState } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { addDoc, deleteDoc } from "firebase/firestore";
import { db, timestamp } from "../firebase/config";

export default function useFirestore(dataBase) {
  const [error, setError] = useState(null);

  // collection ref
  const ref = collection(db, dataBase);
  // const ref = doc(db, dataBase, id)

  // add a document

  const addDocument = async (doc) => {
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, { ...doc, createdAt });
    } catch (err) {
      setError(err.message);
    }
  };

  //delete document

  const deleteDocument = async (id) => {
    try {
      await deleteDoc(doc(db, dataBase, id));
    } catch (err) {
      setError(err.message);
    }
  };
  // update a document
  const updateDocument = async (id, updates) => {
    try {
      const updatedDocument = await updateDoc(doc(db, dataBase, id), updates);

      return updatedDocument;
    } catch (err) {
      setError(err.message);
    }
  };

  return { addDocument, deleteDocument, updateDocument };
}
