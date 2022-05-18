import React from "react";
import Button from "../components/button";
import GameClock from "../components/gameclock";
import SignInButton from "../components/SignInButton/signInButton";
import SignInPage from "../components/SignInButton/signInPage";
import Team from "../components/team";
import ThrowTimer from "../components/throwtimer";
import "../global.scss";

const App = (props) => {
  return (
    <main className="body">
      <div style={{ width: 350 }}>
        <GameClock />
        <SignInPage />
        <Team name="Team One" id={1} />
        <Team name="Team Two" id={2} />
        <ThrowTimer />
      </div>
    </main>
  );
};
export default App;
