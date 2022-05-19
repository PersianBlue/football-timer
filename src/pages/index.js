import React from "react";
import Button from "../components/button";
import GameClock from "../components/gameclock";
import SignInPage from "../components/SignInButton/signInPage";
import Team from "../components/team";
import ThrowTimer from "../components/throwtimer";
import "../global.scss";
import { useState } from "react";
import MatchSettings from "../components/match/matchSettings";
import ChangeTeamNames from "../components/match/changeTeamNames";
const App = (props) => {
  const [teamNames, setTeamNames] = useState([
    {
      teamOne: "Team One",
    },
    { teamTwo: "Team Two" },
  ]);

  const handleCallBack = (TeamNames) => {
    setTeamNames(TeamNames);
    console.log(teamNames);
  };

  return (
    <main className="body">
      <div style={{ width: 350 }}>
        <GameClock />
        <SignInPage />

        <div
          style={{
            border: "thick solid red",
            display: "grid",
            gridTemplateColumns: "1rf 1rf 1rf 1rf",
            justifyContent: "center",
          }}
        >
          {/* <Button name="changeNames" onClick={() => changeNames()}>
            Change Team Names{" "}
          </Button> */}
          <ChangeTeamNames parentCallBack={handleCallBack} />

          <MatchSettings />
        </div>

        <Team name={teamNames[0].teamOne} id={1} />
        <Team name={teamNames[1].teamTwo} id={2} />
        <ThrowTimer />
      </div>
    </main>
  );
};
export default App;
