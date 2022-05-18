import React from "react";
import signInWithGoogle from "./signInWithGoogle";
import Button from "../button/index";
import { SignInDiv } from "./signInButton.scss";
const SignInButton = () => {
  return (
    <div id="SignInDiv">
      <Button
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