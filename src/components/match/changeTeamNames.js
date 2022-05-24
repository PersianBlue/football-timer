import React from "react";
import { useState } from "react";
import Button from "../button";

/*This controls changing the names of the Teams via window prompts, and is called by index.js */

const ChangeTeamNames = ({ teamNames, setTeamNames }) => {
  console.log("Rendering ChangeTeamNames");

  const changeNames = () => {
    let name1 = null;
    let name2 = null;
    name1 = window.prompt("Enter the name for Team 1");
    name2 = window.prompt("Enter the name for Team 2");
    let arr = [...teamNames];
    if (name1) {
      arr[0] = { teamOne: name1 };
    }
    if (name2) {
      arr[1] = { teamTwo: name2 };
    }
    setTeamNames(arr);
  };

  return (
    <div>
      <Button onClick={() => changeNames()}>Change Team Names </Button>
    </div>
  );
};

export default ChangeTeamNames;
