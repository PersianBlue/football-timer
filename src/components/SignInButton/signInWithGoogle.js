import React from "react";
import { auth, db } from "../../firebase-config";
import Button from "../button/index";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";

const addUserToDatabase = (user) => {
  try {
    const docRef = addDoc(collection(db, "users"), {
      UserID: user.uid,
      Email: user.email,
      Name: user.displayName,
    });
    console.log("Added user to database");
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const signInWithGoogle = () => {
  console.log("Signing in with Google ");
  const provider = new GoogleAuthProvider();
  let userExists = false;
  signInWithPopup(auth, provider)
    .then((userCred) => {
      console.log("We signed in with the popup");
      console.log("User:", userCred);
      getDocs(collection(db, "users"))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().UserID === userCred.user.uid) {
              console.log("This user exists");
              console.log(doc.data());
              userExists = true;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      if (!userExists) {
        addUserToDatabase(userCred.user);
      }

      return userCred;
    })
    .catch((err) => {
      console.log(err);
    }); //end sign in with popup
};

export default signInWithGoogle;
