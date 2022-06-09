import React from "react";
import Button from "../button";
import { useState, useEffect } from "react";
import whistleSound from "../../assets/audio/WhistleSoundEffect-short2.mp3";
import * as css from "./css.module.scss";

const ThrowTimer = () => {
  //exports changeSeconds and countdownTimer buttons
  //counter keeps track of the countdown timer
  //newCounter is used to set the counter to a new variable with
  //the changeSeconds button
  //runCountdown acts as a switch to trigger the countdown after button click

  const [counter, setCounter] = useState(4);
  const [runCountdown, setRunCountdown] = useState(false);
  const [newCounter, setNewCounter] = useState(4);

  const startCountdown = () => {
    setRunCountdown(true);
  };
  useEffect(
    //useEffect deals with infinite render problems
    () => {
      if (runCountdown && counter > 0) {
        const handle = setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(handle);
      } else {
        setRunCountdown(false);
        setCounter(newCounter);
      }
      if (counter === 0) {
        //play soundeffect when countdown ends
        var audio = new Audio(whistleSound);
        audio.play();
      }
    },
    [runCountdown, newCounter, counter] //adding dependencies to avoid infinite updates
  );

  const setSeconds = () => {
    //creates a prompt for changing countdown timer length
    //if statement checks validity of input
    let seconds = window.prompt("Enter seconds here");
    seconds = parseInt(seconds);
    if (
      seconds == null ||
      Number.isNaN(seconds) ||
      isNaN(seconds) ||
      seconds === ""
    ) {
      seconds = counter;
    }
    return setNewCounter(seconds);
  };

  return (
    //produces the changeSeconds and countdownTimer button
    <div id="throwTimerDiv" className={css.throwTimerDiv}>
      <br></br>
      <div className={css.changeSecondsDiv}>
        <Button name="changeSeconds" onClick={() => setSeconds()}>
          Change Seconds
        </Button>
      </div>

      <div id="countdownTimerDiv" className={css.countdownTimerDiv}>
        <Button
          id="countdownTimer"
          name="countdownTimer"
          type="circular"
          onClick={() => startCountdown()}
        >
          {" "}
          {counter}
        </Button>
      </div>
    </div>
  );
};

export default ThrowTimer;
