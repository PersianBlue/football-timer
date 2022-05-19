import React from "react";
import Button from "../button";
import { useState } from "react";

const SetHalfTimes = (halfTime) => {
  let time = window.prompt("Set half-time in minutes here");
  if (Number.isNaN(time) || isNaN(time) || time === "") {
    time = halfTime;
  } else {
    time = parseInt(time);
  }

  return [time];
  // <div>
  //   <Button onClick={() => SetHalfTime()}>Set Half-time </Button>
  // </div>
};
