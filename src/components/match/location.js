import React from "react";
import { useState } from "react";
import Button from "../button/index";

const Location = () => {
  const [location, setLocation] = useState("Home");

  const changeLocation = () => {
    let loc = window.prompt("Enter location of match:");
    if (loc != "") {
      setLocation(loc);
    }
  };
  return (
    <div>
      <h1>{location}</h1>
      <button onClick={() => changeLocation()}>Set location </button>
    </div>
  );
};

export default Location;
