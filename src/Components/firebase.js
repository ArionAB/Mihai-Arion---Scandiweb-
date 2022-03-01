import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXVpnmfjpTAa85juGKhbfYQWuV_QGUQfc",
  authDomain: "scandiweb-33659.firebaseapp.com",
  projectId: "scandiweb-33659",
  storageBucket: "scandiweb-33659.appspot.com",
  messagingSenderId: "490514359208",
  appId: "1:490514359208:web:6843a3e854653e1bfeb39d",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const auth = getAuth();

export function logout() {
  return signOut(auth);
}

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const provider = new GoogleAuthProvider();

export const google = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      const email = error.email;
      console.log(email);
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
      // ...
    });
};

export default initializeApp;
