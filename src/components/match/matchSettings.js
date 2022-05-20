import React from "react";
import Location from "./location";
import * as css from "./matchSettings.module.scss";

const MatchSettings = ({ updateLocation }) => {
  return (
    <div id="Settings" className={css.Settings}>
      <Location parentCallBack={updateLocation} />
    </div>
  );
};

export default MatchSettings;
