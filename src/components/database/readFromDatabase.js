// import React from "react";
// import { auth, db } from "../../firebase-config";
// import {
//   collection,
//   addDoc,
//   serverTimestamp,
//   getDoc,
//   getDocs,
// } from "firebase/firestore";

// async function ReadFromDatabase() {
//   console.log("Reading from Database");
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data()}`);
//   });
// }

// export default ReadFromDatabase;
