import React from "react";
import Button from "../components/button";
import GameClock from "../components/gameclock";
import SignInPage from "../components/SignInButton/signInPage";
import Team from "../components/team";
import ThrowTimer from "../components/throwtimer";
import "../global.scss";
import { useState } from "react";
import MatchSettings from "../components/match/matchSettings";
import SaveToDatabase from "../components/database/saveToDatabase";
import { auth, db } from "../firebase-config";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import DataTable from "../components/database/dataTable";
import { useEffect, Suspense } from "react";
import * as css from "./index.module.scss";

let unsubscribe;

async function ReadFromDatabase(userID) {
  const matches = [];
  const q = query(collection(db, "matches"), where("ID", "==", userID));
  //q is a query of the documents in our database matching the criteria we give
  //Here the criteria is that the ID of the document must match the userID we specify
  //in our onSnapshot function, we get the data from each document in the query,
  //then store it in an array called matches
  //the onSnapshot function returns a function we can use to stop listening to the database
  //this is stored as unsubscribe
  unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      matches.push({ ...doc.data(), docID: doc.id });
    });
    // console.log("Matches: ", matches);
  });
  console.log("This is matches:", matches);
  return matches;
}

const App = (props) => {
  console.log("Rendering app.js");
  const [user, setUser] = useState(null);
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);
  const [location, setLocation] = useState("Home");
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
  const [showData, setShowData] = useState(false);

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

  function updateData() {
    try {
      if (user) {
        setDataReady(false);
        const promise = ReadFromDatabase(user.uid).then((result) => {
          console.log("Promise returned:", result);
          setData(result);
          // setTimeout(() => setDataReady(true), 3000);
          console.log("Finished updating data");
          setDataReady(true);
        });
      } else {
        alert("You must be signed in to view match scores");
      }
    } catch (e) {
      console.log("Error in updateData()", e);
    }
  }

  const displayData = () => {
    console.log("Inside display data");
    if (dataReady && !showData) {
      setShowData(true);
    } else if (showData) {
      setShowData(false);
    } else if (!dataReady && !showData) {
      alert("Make sure to sign in and load the data first");
    }
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
    console.log("Team:", id, "Score:", score);
  };

  const uploadMatch = () => {
    console.log("Uploading Match");
    const teamOneName = teamNames[0].teamOne;
    const teamTwoName = teamNames[1].teamTwo;
    if (user) {
      SaveToDatabase(
        location,
        teamOneName,
        teamTwoName,
        teamOneScore,
        teamTwoScore,
        user.uid
      );
    } else {
      alert("Sign in to upload your match scores");
    }
  };

  return (
    <main className="body">
      <div id="mainDiv" className={css.mainDiv}>
        <GameClock />
        <div id="settingsDiv" className={css.settingsDiv}>
          <SignInPage
            setParentUser={updateUser}
            unsubscribe={unsubscribe}
            setDataReady={setDataReady}
            loadDatabase={ReadFromDatabase}
            dataReady={dataReady}
            setShowData={setShowData}
          />
          <MatchSettings
            location={location}
            setLocation={setLocation}
            teamNames={teamNames}
            setTeamNames={setTeamNames}
          />
        </div>
        <div id="TeamDiv" className={css.teamDiv}>
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

        <ThrowTimer />
        <Button onClick={() => uploadMatch()}>Upload Match</Button>
        <Button onClick={() => updateData()}>Load Data</Button>
        <Button onClick={() => displayData()}>Display Data</Button>
        <div id="DataTable">
          {showData ? (
            <DataTable data={data} />
          ) : (
            <p>
              Click Load Data to fetch the data from the database, then display
              data to show it.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};
export default App;
