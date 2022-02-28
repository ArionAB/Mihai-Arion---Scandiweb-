import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  aapiKey: "AIzaSyBXVpnmfjpTAa85juGKhbfYQWuV_QGUQfc",
  authDomain: "scandiweb-33659.firebaseapp.com",
  projectId: "scandiweb-33659",
  storageBucket: "scandiweb-33659.appspot.com",
  messagingSenderId: "490514359208",
  appId: "1:490514359208:web:6843a3e854653e1bfeb39d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => signInWithPopup(provider);

export default initializeApp;
