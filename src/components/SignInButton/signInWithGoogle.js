import React from "react";
import { auth, db } from "../../firebase-config";
import Button from "../button/index";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";

//adds given user to the "users" collection in Firestore
const addUserToDatabase = (user) => {
  try {
    const docRef = addDoc(collection(db, "users"), {
      UserID: user.uid,
      Email: user.email,
      Name: user.displayName,
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//checks "users" collecction in Firestore to see if the current user already exists there
const checkIfUserExists = async (user) => {
  getDocs(collection(db, "users"))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().UserID === user.uid) {
          console.log("This user exists");
          console.log(doc.data());
          return true;
        }
      });
      return false;
    })
    .catch((err) => {
      console.log(err);
    });
};

const signInWithGoogle = () => {
  console.log("Signing in with Google ");
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((userCred) => {
      console.log("We signed in with the popup");
      checkIfUserExists(userCred.user).then((userExists) => {
        if (userExists) {
          return userCred;
        } else {
          addUserToDatabase(userCred.user);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    }); //end sign in with popup
};

export default signInWithGoogle;
