import React from "react";
import Button from "../components/button";
import GameClock from "../components/gameclock"
import Team from "../components/team"
import ThrowTimer from "../components/throwtimer";

const App = (props) => {
  return (
    <main>
      <h1>Start Here</h1>
      <Button>+</Button>
      <GameClock/>
      <Team name = "Team One" id ={1}/>
      <Team name = "Team Two" id = {2}/>
      <ThrowTimer/>
    </main>
  );
};
export default App;
