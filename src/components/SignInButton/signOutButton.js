import React from "react";
import { auth } from "../../firebase-config";
import Button from "../button";

const SignOutButton = () => {
  return (
    <div>
      <Button
        id="signOutButton"
        name="signOutButton"
        onClick={() => auth.signOut()}
      >
        Sign Out{" "}
      </Button>
    </div>
  );
};

export default SignOutButton;
