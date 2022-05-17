import React from "react";
import Button from "../components/button";
import GameClock from "../components/gameclock";
import SignInButton from "../components/SignInButton/signInButton";
import Team from "../components/team";
import ThrowTimer from "../components/throwtimer";
import "../global.scss";

const App = (props) => {
  return (
    <main className="body">
      <div style={{ width: 350 }}>
        <GameClock />
        <SignInButton />
        <Team name="Team One" id={1} />
        <Team name="Team Two" id={2} />
        <ThrowTimer />
      </div>
    </main>
  );
};
export default App;
