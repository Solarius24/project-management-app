import { initializeApp } from "firebase/app";
import {getFirestore, serverTimestamp} from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Timestamp} from '@firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC70Sr7d0BRj5G17QntISSGVLvBJLwU8pE",
  authDomain: "project-management-bff82.firebaseapp.com",
  projectId: "project-management-bff82",
  storageBucket: "project-management-bff82.appspot.com",
  messagingSenderId: "1033661445470",
  appId: "1:1033661445470:web:a17707f9dca66f5a1c8bcf"
};


//init firebase
export const app = initializeApp(firebaseConfig);
//init service
//projectFirestore
export const db = getFirestore(app)
//project Auth
export const auth = getAuth(app)
//timestamp
export const timestamp = Timestamp
//init firebase storage
export const storage = getStorage(app);



