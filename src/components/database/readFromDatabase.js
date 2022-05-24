import React from "react";
import { auth, db } from "../../firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";

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
}

export default ReadFromDatabase;
