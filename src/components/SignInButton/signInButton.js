import React from "react";
import signInWithGoogle from "./signInWithGoogle";
import Button from "../button/index";
import "./signInPage.scss";

const SignInButton = () => {
  return (
    <div id="SignInDiv">
      <p>You are not signed in.</p>
      <Button
        id="signInButton"
        type="roundedEdges"
        name="signInButton"
        onClick={() => signInWithGoogle()}
        text="Sign In "
      >
        Sign In
      </Button>
    </div>
  );
};

export default SignInButton;
