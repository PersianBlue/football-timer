import React from "react";
import { auth } from "../../firebase-config";
import { useState, useEffect } from "react";
import SignInButton from "./signInButton";
import SignOutButton from "./signOutButton";
import "./signOutDiv.css";

const SignInPage = ({ setParentUser }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [thisUser, setThisUser] = useState(null);

  const display = () => {
    return (
      <div id="signOutDiv">
        <h2>Logged in as {thisUser ? thisUser.displayName : "Not defined"}</h2>
        <SignOutButton setParentUser={setParentUser}  />
      </div>
    );
  };

  useEffect(() => {
    const unlisten = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("Signed in Successfully");
          setLoggedIn(true);
          setThisUser(user);
          setParentUser(user);
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
