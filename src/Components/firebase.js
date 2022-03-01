import { initializeApp } from "firebase/app";
import { history } from "./history";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
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
export const db = getFirestore(app);

export const addData = async (email, password, date) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      email,
      password,
      date,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.docs.forEach((doc) => {
    const allData = { ...doc.data(), id: doc.id };
  });
};

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export function logout() {
  return signOut(auth);
}

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {})
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
    });
};

export const register = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {})
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
    });
};

export const google = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      // const token = credential.accessToken;
      history.push("/");
      // The signed-in user info.
      const user = result.user;
      addData(user.email, user.displayName, user.uid);

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
