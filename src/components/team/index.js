import React from "react";
import { useState } from "react";
import Button from "../button";
import * as css from "./css.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Team = ({ name, id, score, incrementScore, decrementScore }) => {
  //Displays team names, score, and + and - buttons
  //state has been migrated to parent component

  return (
    <>
      <div
        style={{ borderColor: "black", borderStyle: "solid" }}
        className={css.divStyle}
      >
        <p className={css.p}>{name}</p>
        <h3 style={{ textAlign: "center" }}>{score}</h3>
        <div id="scoreButtonDiv" class={css.buttonDivStyle}>
          <Button type="scoreButton" onClick={() => decrementScore(score, id)}>
            <FontAwesomeIcon
              icon={faMinus}
              alt="Minus button"
              className={css.scoreButtonDivImg}
            />
          </Button>
          <Button type="scoreButton" onClick={() => incrementScore(score, id)}>
            <FontAwesomeIcon
              icon={faPlus}
              alt="Plus Button"
              className={css.scoreButtonDivImg}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Team;
