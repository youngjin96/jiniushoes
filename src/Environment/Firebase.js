import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-47KtHk8F9nrlyNT1tHRUzLHeigcJj4E",
  authDomain: "jiniushoes.firebaseapp.com",
  projectId: "jiniushoes",
  storageBucket: "jiniushoes.appspot.com",
  messagingSenderId: "287778600778",
  appId: "1:287778600778:web:0d1c70fed72dbd0f76b3b3",
  measurementId: "G-VFXLGS9BDP"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);