import React from "react";
import Location from "./location";
import * as css from "./matchSettings.module.scss";

const MatchSettings = ({ location, setLocation }) => {
  
  const updateLocation = (location) => {
    let loc = window.prompt("Enter location of match:");
    if (loc != "") {
      setLocation(loc);
    }
  };
  return (
    <div id="Settings" className={css.Settings}>
      <Location
        location={location}
        updateLocation={updateLocation}
        setLocation={setLocation}
      />
    </div>
  );
};

export default MatchSettings;
