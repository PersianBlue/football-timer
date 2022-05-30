import React from "react";
import { useState } from "react";
import Button from "../button/index";
import * as css from "./matchSettings.module.scss";

const Location = ({ location, updateLocation }) => {
  return (
    <div id="locationDiv" className={css.locationDiv}>
      <h1>{location}</h1>
      <Button onClick={() => updateLocation()}>
        Set location / Tournament
      </Button>
    </div>
  );
};

export default Location;
