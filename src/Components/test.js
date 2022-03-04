import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, doc, getDocs } from "firebase/firestore/lite";
import { getData } from "./firebase";

export function Test({ user }) {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    console.log(users && users);
  }, []);
  return <div>Ok</div>;
}
/*   const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users"); */

/*     const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers(); */
