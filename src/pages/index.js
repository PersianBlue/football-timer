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
import { auth, db } from "../firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";
import DataTable from "../components/database/dataTable";

async function ReadFromDatabase() {
  const matches = [];
  const q = query(collection(db, "matches"));
  //q is a query of the documents in our database matching the criteria we give
  //in our onSnapshot function, we get the data from each document in the query,
  //then store it in an array called matches
  //the onSnapshot function returns a function we can use to stop listening to the database
  //this is stored as unsubscribe
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      matches.push(doc.data());
    });
    console.log("Matches: ", matches);
  });
  console.log("This is matches:", matches);
  return matches;
}

const App = (props) => {
  const [user, setUser] = useState(null);
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);
  const [location, setLocation] = useState("Home");
  const array = ["love", "pineapple", "pizza"];
  const [data, setData] = useState([
    {
      teamOne: "Love",
      teamTwo: "Wins",
      Location: "Home",
      teamOneScore: 0,
      teamTwoScore: 0,
    },
  ]);
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

  async function updateData() {
    try {
      const promise = await ReadFromDatabase();
      console.log("Promise returned:", promise);
      setData(promise);
      setDataReady(true);
    } catch (e) {
      console.log("Error in updateData()", e);
    }
  }

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
      <div style={{ width: 700, border: "thick solid" }}>
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
          <ChangeTeamNames teamNames={teamNames} setTeamNames={setTeamNames} />
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
        {dataReady ? <DataTable data={data} /> : <h1>Data is not ready</h1>}

        <Button onClick={() => uploadMatch()}>Upload Match</Button>
        <Button onClick={() => updateData()}>Read Database</Button>
        <ThrowTimer />
      </div>
    </main>
  );
};
export default App;
