import React from "react";
import { auth, db } from "../../firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";

async function ReadFromDatabase() {
  console.log("Reading from Database");
  const data = getDocs(collection(db, "matches"))
    .then((snapshot) => {
      const arr = [];
      snapshot.forEach((doc) => arr.push(doc.data()));
      console.log(arr);
      return arr;
    })
    .catch((e) => {
      console.log("Error: ", e);
    });

  return data;
  //   getDocs(collection(db, "matches")).then((snapshot) => {
  //     console.log(snapshot.docs);
  //     snapshot.forEach((doc) => {
  //       const data = doc.data();
  //       console.log(data);
  //         console.log(`${doc.id} => ${doc.data().location}`);
  //     }

  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
}

export default ReadFromDatabase;
