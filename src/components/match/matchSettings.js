import React from "react";
import Location from "./location";
import * as css from "./matchSettings.module.scss";
import Button from "../button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faGear, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const MatchSettings = ({
  location,
  setLocation,
  teamNames,
  setTeamNames,
  showSettings,
  getHalfTime,
}) => {
  //updates location variable in the parent component with a window prompt
  const updateLocation = (location) => {
    let loc = window.prompt("Enter location of match:");
    if (loc != "" && loc != null) {
      setLocation(loc);
    }
  };

  //updates team names in parent component
  const changeNames = () => {
    let name1 = null;
    let name2 = null;
    name1 = window.prompt("Enter the name for Team 1");
    name2 = window.prompt("Enter the name for Team 2");
    let arr = [...teamNames];
    if (name1) {
      arr[0] = { teamOne: name1 };
    }
    if (name2) {
      arr[1] = { teamTwo: name2 };
    }
    setTeamNames(arr);
  };

  return (
    <div id="matchSettings" className={css.matchSettings}>
      {showSettings ? (
        <div id="Settings" className={css.Settings}>
          <Location
            location={location}
            updateLocation={updateLocation}
            setLocation={setLocation}
          />
          <Button name="changeTeamNames" onClick={() => changeNames()}>
            <span>
              <FontAwesomeIcon icon={faKeyboard} /> Change Team Names{" "}
            </span>
          </Button>
          <Button type="roundedEdges" onClick={() => getHalfTime()}>
            <FontAwesomeIcon icon={faClock} /> Set Half-Time
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MatchSettings;
