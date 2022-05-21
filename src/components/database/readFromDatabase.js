import React from "react";
import { auth, db } from "../../firebase-config";
import {
  collection,
  query,
  where,
  doc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";

async function ReadFromDatabase() {
  const matches = [];
  const q = query(collection(db, "matches"));
  //q is a query of the documents in our database matching the criteria we give
  //in our onSnapshot function, we get the data from each document in the query,
  //then store it in an array called matches
  //the onSnapshot function returns a function we can use to stop listening to the database
  //this is stored as unsubscribe
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      matches.push(doc.data());
    });
    console.log("Matches: ", matches);
  });
  return matches;
  //   const unsub = onSnapshot(doc(db, "matches"), (doc) => {
  //     console.log("Current data: ", doc.data());
  //   });
  //   console.log("Reading from Database");
  //   const data = getDocs(collection(db, "matches"))
  //     .then((snapshot) => {
  //       snapshot.docs;
  //       const arr = [];
  //       snapshot.forEach((doc) => arr.push(doc.data()));
  //       console.log(arr);
  //       return arr;
  //     })
  //     .catch((e) => {
  //       console.log("Error: ", e);
  //     });
  //   return data;
}

//unsubscribe = thingsRef.where("uid", "==", user.uid).onSnapshot(querySnapshot => {
// const items = querySnapshot.docs.map(doc => {
//     return `<li> ${doc.data().name} </li>`
//     // })
// })

export default ReadFromDatabase;
