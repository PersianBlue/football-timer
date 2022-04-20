import React from "react";
import Button from "../components/button/Button";
import GameClock from "../components/gameclock/GameClock"
import Team from "../components/team/Team"

const App = (props) => {
  return (
    <main>
      <h1>Start Here</h1>
      <Button>+</Button>
      <GameClock/>
      <Team name = "Team 1" id ={1}/>
      <Team name = "Team 2" id = {2}/>
    </main>
  );
};
export default App;
