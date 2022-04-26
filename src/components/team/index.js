import React from "react";
import { useState } from "react";
import Button from "../button";
import * as css from "./css.module.scss";
import minusButton from "../../assets/images/minusButton.png"
import plusButton from "../../assets/images/plusButton.png"
const Team = ({ name, ID }) => {
  //keeps track of score with state variables
  //increment and decrement score on button click
  //Dsplays team names, score, and + and - buttons

  const [score, setScore] = useState(0);

  const incrementScore = () => {
    setScore(score + 1);
  };

  const decrementScore = () => {
    setScore(score - 1);
  };

  return (
    <div
      style={{ borderColor: "black", borderStyle: "solid" }}
      class={css.divStyle}
    >
      <p className={css.p}>{name}</p>
      <h3 style={{ textAlign: "center" }}>{score}</h3>
      <div id="scoreButtonDiv" class={css.buttonDivStyle}>
        <Button type="roundedEdges" onClick={() => decrementScore()}>
          <img  className = {css.scoreButtonDivImg} src={minusButton}  />{" "}
        </Button>
        <Button type="roundedEdges" onClick={() => incrementScore()}>
          <img className = {css.scoreButtonDivImg} src ={plusButton} />
        </Button>
      </div>
    </div>
  );
};

export default Team;
