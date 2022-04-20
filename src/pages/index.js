import React from "react";
import Button from "../components/Button"
import GameClock from "../components/GameClock"

const App = (props) => {
  return (
    <main>
      <h1>Start Here</h1>
      <Button>+</Button>
      <GameClock/>
    </main>
  );
};
export default App;
