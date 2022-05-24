import React from "react";
import { auth, db } from "../../firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp,
  FieldValue,
} from "firebase/firestore";

async function SaveToDatabase(
  location,
  TeamOneName,
  TeamTwoName,
  TeamOneScore,
  TeamTwoScore
) {
  console.log("Saving Data to Database");
  console.log(location, TeamOneName, TeamOneScore, TeamTwoName, TeamTwoScore);
  try {
    const docRef = await addDoc(collection(db, "matches"), {
      Location: location,
      TeamOne: TeamOneName,
      TeamTwo: TeamTwoName,
      TeamOneScore: TeamOneScore,
      TeamTwoScore: TeamTwoScore,
      Date: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export default SaveToDatabase;
