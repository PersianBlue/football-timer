import React from "react";
import { auth } from "../../firebase-config";
import Button from "../button";

const SignOutButton = ({ setParentUser }) => {
  const signOut = () => {
    auth.signOut();
    setParentUser(null);
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
