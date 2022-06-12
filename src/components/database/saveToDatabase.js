import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

//creates a new document in the Firestore "matches" collection with the given data
async function SaveToDatabase(
  location,
  TeamOneName,
  TeamTwoName,
  TeamOneScore,
  TeamTwoScore,
  userID,
  userName
) {
  console.log("Saving Data to Database");
  try {
    let date = new Date();
    console.log("Date: ", date);
    const docRef = await addDoc(collection(db, "matches"), {
      UID: userID,
      Location: location,
      TeamOne: TeamOneName,
      TeamTwo: TeamTwoName,
      TeamOneScore: TeamOneScore,
      TeamTwoScore: TeamTwoScore,
      Date: date,
      Creator: userName,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export default SaveToDatabase;
