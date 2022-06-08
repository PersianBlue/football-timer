import React from "react";
import { useState } from "react";
import Button from "../button/index";
import * as css from "./matchSettings.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Location = ({ location, updateLocation }) => {
  return (
    <div id="locationDiv" className={css.locationDiv}>
      <h1>{location}</h1>
      <Button name="locationButton" onClick={() => updateLocation()}>
        <span>
          <FontAwesomeIcon icon={faLocationDot} /> Set Tournament/Location
        </span>
      </Button>
    </div>
  );
};

export default Location;
