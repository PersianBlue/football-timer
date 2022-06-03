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
  const signOut = () => {
    if (dataReady) {
      unsubscribe();
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
