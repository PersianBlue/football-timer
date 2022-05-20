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
import SaveToDatabase from "../components/database/saveToDatabase";
import ReadFromDatabase from "../components/database/readFromDatabase";

const App = (props) => {
  const [user, setUser] = useState(null);
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);
  const [location, setLocation] = useState("Home");
  const [data, setData] = useState([]);
  const [dataReady, setDataReady] = useState(false);

  const updateUser = (User) => {
    setUser(User);
    console.log("User:", user);
  };
  const [teamNames, setTeamNames] = useState([
    {
      teamOne: "Team One",
    },
    { teamTwo: "Team Two" },
  ]);

  const handleCallBack = (TeamNames) => {
    setTeamNames(TeamNames);
    // console.log("In handleCallBack:", teamNames);
  };

  function updateData() {
    const promise = ReadFromDatabase().then(
      (result) => {
        console.log("Result of promise: ", result);
        setData(result);
        setDataReady(true);
      },
      (e) => {
        console.log("Error: ", e);
      }
    );
  }

  const DisplayArrayElement = (element) => {
    console.log(element.TeamOne);
    return (
      <ul>
        <li>Team One: {element.teamOne} </li>
        <li>Team Two: {element.teamTwo} </li>
        <li>Match Location: {element.Location}</li>
        <li>Match date: {element.Date}</li>
      </ul>
    );
  };

  const displayData = (data) => {
    return data.map((element) => DisplayArrayElement(element));
  };

  const increment = (score, id) => {
    setTeamScores(score + 1, id);
  };

  const decrement = (score, id) => {
    setTeamScores(score - 1, id);
  };

  const setTeamScores = (score, id) => {
    if (id === 1) {
      setTeamOneScore(score);
    }
    if (id === 2) {
      setTeamTwoScore(score);
    }
    console.log(score, id);
  };

  const uploadMatch = () => {
    console.log("Uploading Match");
    const teamOneName = teamNames[0].teamOne;
    const teamTwoName = teamNames[1].teamTwo;
    console.log("Location: ", location);
    SaveToDatabase(
      location,
      teamOneName,
      teamTwoName,
      teamOneScore,
      teamTwoScore
    );
  };

  return (
    <main className="body">
      <div style={{ width: 400 }}>
        <GameClock />
        <div
          style={{
            marginLeft: 25,
            marginRight: 25,
            minWidth: "100",
            backgroundColor: "white",
            border: "thick solid ",
            display: "grid",
            gridTemplateColumns: "1rf 1rf 1rf 1rf",
            justifyContent: "center",
          }}
        >
          <SignInPage parentCallBack={updateUser} />
          <ChangeTeamNames parentCallBack={handleCallBack} />
          <MatchSettings location={location} setLocation={setLocation} />
        </div>
        <div style={{ display: "inline-block", border: "thick solid lime" }}>
          <Team
            score={teamOneScore}
            name={teamNames[0].teamOne}
            id={1}
            incrementScore={increment}
            decrementScore={decrement}
          />
          <Team
            score={teamTwoScore}
            name={teamNames[1].teamTwo}
            id={2}
            incrementScore={increment}
            decrementScore={decrement}
          />
        </div>
        {data.map((value) => {
          console.log("This is patrick");
          return <h1>This is patrick's location: {value.Location}</h1>;
        })}
        {/* {displayData(data)} */}
        <Button onClick={() => uploadMatch()}>Upload Match</Button>
        <Button onClick={() => updateData()}>Read Database</Button>
        <Button onClick={() => displayData(data)}>Display Data </Button>
        <ThrowTimer />
      </div>
    </main>
  );
};
export default App;
