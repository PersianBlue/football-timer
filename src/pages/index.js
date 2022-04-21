import React from "react";
import Button from "../components/button";
import GameClock from "../components/gameclock"
import Team from "../components/team"
import ThrowTimer from "../components/throwtimer";
import "../global.scss"


const App = (props) => {
  return (
    <main className = 'body'>
      <h1>Football Timer</h1>
      <GameClock/>
      <Team name = "Team One" id ={1}/>
      <Team name = "Team Two" id = {2}/>
      <ThrowTimer/>
    </main>
  );
};
export default App;
