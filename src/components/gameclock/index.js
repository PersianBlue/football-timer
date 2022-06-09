import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../button";
import whistleSoundLong from "../../assets/audio/WhistleSoundEffect-long.mp3";
import whistleSoundLonger from "../../assets/audio/WhistleSoundEffect-longer.mp3";

import "./css.module.scss";
import * as css from "./css.module.scss";

const GameClock = () => {
  //state variables and functions for controlling the time
  const [hrs, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [stopped, setStopped] = useState(true);
  const [halfTime, setHalfTime] = useState(1);
  const [matchEnded, setMatchEnded] = useState(false);

  //sets halfTime variable to given input
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

  const updateSeconds = () => {
    setSecs(secs + 1);
  };

  const updateMinutes = () => {
    if (secs >= 60) {
      const newMins = Math.floor(60 / secs); //converts & stores all accumulated secs in newMins
      setMins(mins + newMins); //updates mins with newMins
      setSecs(secs % 60); //remove 60 from secs, and set it to remainder (incase secs = 65 for e.g)
    }
  };
  const updateHours = () => {
    // updates the hours every 60 minutes, however the value is not used
    if (mins >= 60) {
      const newHrs = Math.floor(60 / mins);
      setHours(hrs + newHrs);
      setMins(mins % 60);
    }
  };

  const resetTimer = () => {
    //resets all the times to 0 and stops the timer
    setHours(0);
    setMins(0);
    setSecs(0);
    stopTimer();
    setMatchEnded(false);
  };

  const stopTimer = () => {
    //stops the timer if it hasn't already been stopped
    if (!stopped) {
      console.log("Stopped timer");
      setStopped(true);
    }
  };

  const startTimer = () => {
    //starts the timer if it has been stopped
    if (stopped) {
      setStopped(false);
      console.log("Starting timer");
    }
  };

  const updateAll = (stopped, isReset) => {
    console.log("Inside update all");
    //updates seconds, mins, hours using previous functions
    if (!stopped) {
      //console.log("Updating hh:mm:ss");
      updateSeconds(secs);
      updateMinutes(secs, mins);
      updateHours(mins, hrs);
    }
    //stop timer and play whistle when halfTime or fullTime are reached
    const fullTime = 2 * halfTime;
    if (secs === 0 && mins === fullTime) {
      console.log("Game ended");
      setMatchEnded(true);
      stopTimer();
      var audio = new Audio(whistleSoundLonger);
      audio.play();
    } else if (mins === halfTime && secs === 0) {
      console.log("At Half Time");
      stopTimer();
      var audio = new Audio(whistleSoundLong);
      audio.play();
    }
  };

  useEffect(
    //useEffect solves the re-rendering too many times issue
    () => {
      const handle = setInterval(() => {
        if (!stopped) {
          updateAll(stopped);
        }
      }, 1000);
      return () => clearInterval(handle); //clear interval on unmount
    }
  );
  return (
    <div id="gameClockDiv" className={css.gameClockDiv}>
      <div id="timersClockDiv" className={css.timersClockDiv}>
      <div id="clockDiv" className={css.clockDiv}>
        <h1 className={css.h1}>
          {mins}:{secs}
        </h1>
        <div id="timersDiv" className={css.timersDiv}>
          <Button name="startTimer" onClick={() => startTimer()}>
            {" "}
            Start{" "}
          </Button>
          <Button name="stopTimer" onClick={() => stopTimer()}>
            {" "}
            Stop{" "}
          </Button>
        </div>
        {/*End timers Div*/}
      </div>{" "}
      {/*End clock Div*/}
      </div> 
      <div id="resetTimerDiv" className={css.resetTimerDiv}>
        <Button
          style={{ width: 100, height: 150 }}
          type="resetTimer"
          name="resetTimer"
          onClick={() => resetTimer()}
        >
          Reset Timer{" "}
        </Button>
      </div>
      <div className={css.halfTimeDiv}>
        {mins < halfTime ? <h3>First Half </h3> : <h3>Second Half</h3>}

        <h3>
          Half time Set to: {halfTime} {halfTime === 1 ? "minute" : "minutes"}
        </h3>

        {matchEnded ? <h3>Match Ended!</h3> : ""}
        <div style={{ textAlign: "center" }}>
          <Button type="roundedEdges" onClick={() => getHalfTime()}>
            Set Half-Time
          </Button>
        </div>
      </div>
    </div>
  );
};
export default GameClock;
