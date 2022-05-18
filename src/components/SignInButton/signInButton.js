import React from "react";
import signInWithGoogle from "./signInWithGoogle";
import Button from "../button/index";
import { SignInDiv } from "./signInDiv.scss";
const SignInButton = () => {
  return (
    <div id="SignInDiv">
      <h2 style={{ marginTop: 12 }}>You are not signed in.</h2>
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
