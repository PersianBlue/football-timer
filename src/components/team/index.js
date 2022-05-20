import React from "react";
import { useState } from "react";
import Button from "../button";
import * as css from "./css.module.scss";
import minusButton from "../../assets/images/minusButton.png";
import plusButton from "../../assets/images/plusButton.png";
const Team = ({ name, id, parentCallBack }) => {
  //keeps track of score with state variables
  //increment and decrement score on button click
  //Displays team names, score, and + and - buttons

  const [score, setScore] = useState(0);

  const incrementScore = () => {
    setScore(score + 1);
    parentCallBack(score, id);
  };

  const decrementScore = () => {
    setScore(score - 1);
    parentCallBack(score, id);
  };

  parentCallBack(score, id);

  return (
    <>
      <div
        style={{ borderColor: "black", borderStyle: "solid" }}
        className={css.divStyle}
      >
        <p className={css.p}>{name}</p>
        <h3 style={{ textAlign: "center" }}>{score}</h3>
        <div id="scoreButtonDiv" class={css.buttonDivStyle}>
          <Button type="roundedEdges" onClick={() => decrementScore()}>
            <img className={css.scoreButtonDivImg} src={minusButton} />{" "}
          </Button>
          <Button type="roundedEdges" onClick={() => incrementScore()}>
            <img className={css.scoreButtonDivImg} src={plusButton} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Team;
