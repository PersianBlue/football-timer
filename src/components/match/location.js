import React from "react";
import { useState } from "react";
import Button from "../button/index";

const Location = ({ location, updateLocation }) => {
  // const [location, setLocation] = useState("Home");

  // const changeLocation = () => {
  //   let loc = window.prompt("Enter location of match:");
  //   if (loc != "") {
  //     setLocation(loc);
  //     parentCallBack(location);
  //   }
  // };

  // parentCallBack(location);
  return (
    <div>
      <h1>{location}</h1>
      <button onClick={() => updateLocation()}>Set location </button>
    </div>
  );
};

export default Location;
