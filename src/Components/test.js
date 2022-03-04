import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore/lite";

export function Test() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div>
      {users.map((user) => {
        // console.log(user);
        return (
          <div>
            <h1>{user.email}</h1>
            <h1>{user.id}</h1>
          </div>
        );
      })}
    </div>
  );
}
