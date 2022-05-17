import React from "react";
import signInWithGoogle from "./signInWithGoogle";
import Button from "../button";
import { signInButton } from "./signInButton.scss";

const SignInButton = () => {
  return (
    <div id="SignInDiv">
      <Button
        className={signInButton}
        id="signInButton"
        type="roundedEdges"
        name="signInButton"
        onClick={() => signInWithGoogle()}
        text="Sign In With Google"
      >
        Sign In With Google{" "}
      </Button>
    </div>
  );
};

export default SignInButton;
