import React from "react";
import { auth } from "../../firebase-config";
import { useState, useEffect } from "react";
import SignInButton from "./signInButton";
import SignOutButton from "./signOutButton";
import "./signInPage.scss";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

const SignInPage = ({
  setParentUser,
  unsubscribe,
  setDataReady,
  dataReady,
  setShowData,
  setIsAdmin,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [thisUser, setThisUser] = useState(null);

  const display = () => {
    return (
      <div id="signOutDiv">
        <h3>Logged in as </h3>
        <h3> {thisUser ? thisUser.displayName : "Not defined"}</h3>
        <SignOutButton
          setParentUser={setParentUser}
          unsubscribe={unsubscribe}
          setDataReady={setDataReady}
          dataReady={dataReady}
          setShowData={setShowData}
          setIsAdmin={setIsAdmin}
        />
      </div>
    );
  };

  //checks "users" collection in Firestore to see if given user is an Admin
  //current implementation has Admin as a boolean value
  const checkAdmin = (user) => {
    const q = query(collection(db, "users"), where("UserID", "==", user.uid));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().Admin) {
          setIsAdmin(true);
          console.log("User is an admin");
        }
      });
    });
  };

  useEffect(() => {
    // creates a listener object to listen for auth state changes
    // if a user is signed in, it initializes user variables locally and in parent component
    //it also runs checkAdmin to set the Admin property in the parent component
    const unlisten = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("Signed in Successfully");
          setLoggedIn(true);
          setThisUser(user);
          setParentUser(user);
          checkAdmin(user);
        } else {
          console.log("Not logged in");
          setLoggedIn(false);
          setThisUser(null);
        }
      });
    };

    return unlisten();
  }, []);

  return <div>{loggedIn ? display() : <SignInButton />}</div>;
};

export default SignInPage;
