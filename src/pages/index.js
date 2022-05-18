import React from "react";
import Button from "../components/button";
import GameClock from "../components/gameclock";
import SignInPage from "../components/SignInButton/signInPage";
import Team from "../components/team";
import ThrowTimer from "../components/throwtimer";
import "../global.scss";
import { useState } from "react";

const App = (props) => {
  const [teamNames, setTeamNames] = useState([
    {
      teamOne: "Team One",
    },
    { teamTwo: "Team Two" },
  ]);

  const changeNames = () => {
    let name1 = null;
    let name2 = null;
    name1 = window.prompt("Enter the name for Team 1");
    name2 = window.prompt("Enter the name for Team 2");
    let arr = [...teamNames];
    if (name1 != "") {
      arr[0] = { teamOne: name1 };
    }
    if (name2 != "") {
      arr[1] = { teamTwo: name2 };
    }
    setTeamNames(arr);
    console.log("Name1 :", name1);
    console.log("Team one: ", teamNames[0]);
    console.log("Name2 :", name2);
    console.log("Team Two: ", teamNames[1]);
  };

  return (
    <main className="body">
      <div style={{ width: 350 }}>
        <GameClock />
        <Button onClick={() => changeNames()}>Change Team Names </Button>
        <SignInPage />
        <Team name={teamNames[0].teamOne} id={1} />
        <Team name={teamNames[1].teamTwo} id={2} />
        <ThrowTimer />
      </div>
    </main>
  );
};
export default App;
