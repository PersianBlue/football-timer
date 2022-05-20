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
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const updateLocation = (location) => {
    setLocation(location);
    console.log("Location:", location);
  };

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

  const displayData = () => {
    data.forEach((ele) => console.log(ele.Location));
    data.map((ele) => <h1>This is my data</h1>);
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
          <MatchSettings updateLocation={updateLocation} />
        </div>
        <div style={{ display: "inline-block", border: "thick solid lime" }}>
          <Team
            name={teamNames[0].teamOne}
            id={1}
            parentCallBack={setTeamScores}
          />
          <Team
            name={teamNames[1].teamTwo}
            id={2}
            parentCallBack={setTeamScores}
          />
        </div>
        <h1>
          Team 1: {teamOneScore} Team 2: {teamTwoScore}
        </h1>
        {data.map((value) => {
          console.log("This is patrick");
          return <h1>This is patrick's location: {value.Location}</h1>;
        })}
        <Button onClick={() => uploadMatch()}>Upload Match</Button>
        <Button onClick={() => updateData()}>Read Database</Button>
        <Button onClick={() => displayData()}>Display Data </Button>
        <ThrowTimer />
      </div>
    </main>
  );
};
export default App;
