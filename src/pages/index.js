import React from "react";
import Button from "../components/button";
import GameClock from "../components/gameclock";
import SignInPage from "../components/SignInButton/signInPage";
import Team from "../components/team";
import ThrowTimer from "../components/throwtimer";
import "../global.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDisplay,
  faEyeSlash,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import MatchSettings from "../components/match/matchSettings";
import SaveToDatabase from "../components/database/saveToDatabase";
import { db } from "../firebase-config";
import {
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  setDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import DataTable from "../components/database/dataTable";
import * as css from "./index.module.scss";

//this variable is used to cancel the listener object that listens for
//changes to the firestore database
let unsubscribe;

const App = (props) => {
  /*
  This component renders the entire visible page
  The app here is a football timer with additional features such as half time and throwout timers
  It allows users to keep time for a live game, and store data about a match such as
  Team names, scores, the tournament/location
  Users can also save this data to the cloud with Firebase
  Saving data requires logging in with Google then uploading the current match
  Users can also see and delete the matches that they have already uploaded with their account
  Admin users are able to see and delete all matches as well as create other admins
  */
  console.log("Rendering app.js");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);
  const [location, setLocation] = useState("Home");
  const [dataReady, setDataReady] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [halfTime, setHalfTime] = useState(1);
  const [sorter, setSorter] = useState("Date");

  const sortTable = (value) => {
    setSorter(value);
  };
  useEffect(() => {
    updateData();
  }, [sorter]);
  const [data, setData] = useState([
    {
      teamOne: "Love",
      teamTwo: "Wins",
      Location: "Home",
      teamOneScore: 0,
      teamTwoScore: 0,
      UID: 0,
      docID: 0,
    },
  ]);
  const [teamNames, setTeamNames] = useState([
    {
      teamOne: "Team One",
    },
    { teamTwo: "Team Two" },
  ]);

  //sets the value of half time for the match
  const getHalfTime = () => {
    let time = window.prompt("Set half-time in minutes here");
    time = parseInt(time);
    if (time == null || Number.isNaN(time) || isNaN(time) || time === "") {
      if (Number.isNaN(halfTime)) {
        setHalfTime(1);
      }
    } else {
      setHalfTime(time);
      console.log("Half time set to", time);
    }
    return time;
  };

  //gets an email via window prompt
  const getEmail = () => {
    let email = window.prompt(
      "Enter the email of the user to promote to an admin."
    );
    if (email != null && email !== "" && validateEmail(email)) {
      console.log("The email passed.", email);
      return email;
    } else {
      alert("Data entered was not a valid email");
      return false;
    }
  };

  //checks if email is a valid email with regex expression
  const validateEmail = (email) => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  };
  //What: Makes a given user an admin
  //How: Query the users collection for the user document whose email matches the given email
  //Sets that document's Admin property to true
  const makeAdmin = () => {
    let email = getEmail();
    if (email) {
      const q = query(collection(db, "users"), where("Email", "==", email));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          console.log("Document found:", document.data());
          try {
            setDoc(
              doc(db, "users", document.id),
              {
                Admin: true,
              },
              { merge: true }
            );
          } catch (error) {
            console.log(error);
          }
        });
        console.log("We set the user as an admin");
      });
    } else {
      console.log("Email validation failed");
    }
  };

  //returns an array with matches loaded from the Firestore database
  //if the user is an Admin, it adds all matches
  //if not, only matches containing the given userID are returned
  async function ReadFromDatabase(userID) {
    console.log("Reading from database");
    console.log("Sorter is " + sorter);
    const matches = [];
    if (user) {
      if (isAdmin) {
        const q = query(collection(db, "matches"), orderBy(sorter));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            matches.push({ ...doc.data(), docID: doc.id });
          });
        });
      } else {
        const q2 = query(
          collection(db, "matches"),
          where("UID", "==", userID),
          orderBy(sorter)
        );
        unsubscribe = onSnapshot(q2, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            matches.push({ ...doc.data(), docID: doc.id });
          });
        });
      }
      return matches;
    }
  }

  const updateUser = (User) => {
    setUser(User);
    console.log("Updated User. This will show on next render");
  };

  //updates data with the array returned from ReadFromDatabase
  //bug fix: to prevent datatable being displayed before data is ready
  //set display variables to false until after async operation finishes
  function updateData() {
    try {
      if (user) {
        setDataReady(false);
        setShowData(false);
        const promise = ReadFromDatabase(user.uid).then((result) => {
          console.log("Promise returned:", result);
          setData(result);
          console.log("Finished updating data");
          setDataReady(true);
          setTimeout(() => setShowData(true), 2000);
          //setShowData(true);
        });
      } else {
        alert("You must be signed in to view match scores");
      }
    } catch (e) {
      console.log("Error in updateData()", e);
    }
  }
  //Controls displaying the data table
  //dataReady checks if the data has been loaded, showData toggles visibility of the data table
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

  //uploads match scores & data to Firebase/Firestore with SaveToDatabase
  //bug fix: also runs updateData to fix synchronization issues
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
        user.uid,
        user.displayName
      ).then(() => {
        updateData();
      });
    } else {
      alert("Sign in to upload your match scores");
    }
  };

  //Renders all other components:
  //GameClock, SignInPage, MatchSettings, Team, ThrowTimer, DataTable
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <script
        src="https://kit.fontawesome.com/5f53d7f4ac.js"
        crossorigin="anonymous"
      ></script>
      <title>Football Timer</title>

      <main className={css.main}>
        <div id="mainDiv" className={css.mainDiv}>
          <nav class={css.navBar}>
            <ul>
              <li>
                <SignInPage
                  setParentUser={updateUser}
                  unsubscribe={unsubscribe}
                  setDataReady={setDataReady}
                  loadDatabase={ReadFromDatabase}
                  dataReady={dataReady}
                  setShowData={setShowData}
                  setIsAdmin={setIsAdmin}
                />
              </li>
              <li>
                <span>Match Location</span>
                <h2 className={css.h1}>{location}</h2>
              </li>
              <li>
                <Button
                  name="Settings"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <FontAwesomeIcon icon={faGear} /> Settings
                </Button>
              </li>
            </ul>
          </nav>
          <MatchSettings
            location={location}
            setLocation={setLocation}
            teamNames={teamNames}
            setTeamNames={setTeamNames}
            showSettings={showSettings}
            getHalfTime={getHalfTime}
          />
          <GameClock halfTime={halfTime} />
          <div id="settingsDiv" className={css.settingsDiv}></div>
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
          <div id="buttonsDiv" className={css.buttonsDiv}>
            {isAdmin ? (
              <Button onClick={() => makeAdmin()}>
                <span>
                  <i class="fa fa-user-circle"></i> Make Admin
                </span>
              </Button>
            ) : (
              ""
            )}
            <Button onClick={() => uploadMatch()}>
              <i class="fa fa-upload"></i> Upload Match
            </Button>
            <Button onClick={() => updateData()}>
              <i class="fa fa-download"></i> Load Data
            </Button>
            <Button onClick={() => displayData()}>
              {showData ? (
                <span>
                  <FontAwesomeIcon icon={faEyeSlash} />
                  Hide Data
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon icon={faDisplay} />
                  {"  "}Display Data
                </span>
              )}
            </Button>
          </div>
          <div id="DataTable">
            {showData ? (
              <DataTable
                data={data}
                updateData={updateData}
                isAdmin={isAdmin}
                sortTable={sortTable}
              />
            ) : (
              <p>
                Click Load Data to fetch the data from the database, then
                display data to show it. Click the table headers to sort by that
                entry.
              </p>
            )}
          </div>
          <footer
            style={{
              textAlign: "center",
              marginTop: 250,
              fontFamily: "Verdana",
            }}
          >
            <p>
              Made by{" "}
              <a
                href="https://www.github.com/PersianBlue"
                style={{ color: "black" }}
                target="_blank"
                rel="noreferrer"
              >
                PersianBlue
              </a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};
export default App;
