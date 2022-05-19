import React from "react";
import Location from "./location";
import * as css from "./matchSettings.module.scss";

const MatchSettings = () => {
  return (
    <div id="Settings" className={css.Settings}>
      <Location />
    </div>
  );
};

export default MatchSettings;
