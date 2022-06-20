import React from "react";
import { auth } from "../../firebase-config";
import Button from "../button";

const SignOutButton = ({
  setParentUser,
  unsubscribe,
  setDataReady,
  dataReady,
  setShowData,
  setIsAdmin,
}) => {
  //signs out using Firebase auth and cancels listener object
  //resets parent data values to null/false
  const signOut = () => {
    if (dataReady) {
      if (unsubscribe) {
        try {
          unsubscribe();
          console.log("Unsubscribed from data");
        } catch (e) {
          console.log(e);
        }
      }
    }
    auth.signOut();
    setParentUser(null);
    setDataReady(false);
    setShowData(false);
    setIsAdmin(false);
  };
  return (
    <div>
      <Button id="signOutButton" name="signOutButton" onClick={() => signOut()}>
        Sign Out{" "}
      </Button>
    </div>
  );
};

export default SignOutButton;
