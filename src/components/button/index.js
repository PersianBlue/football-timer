import React from "react";
//import "./css.module.scss";
import * as css from "./css.module.scss";

const Button = (props) => {
  //creates all the buttons seen on screen
  //if statements are specific to particular buttons
  if (props.name === "changeSeconds") {
    return (
        <button
          className={css.changeSeconds}
          id={props.id}
          onClick={props.onClick}
        >
          {props.children}
        </button>
    );
  }

  if (props.name === "resetTimer") {
    return (
        <button
          className={css.resetTimer}
          id={props.id}
          onClick={props.onClick}
        >
          {props.children}
        </button>
    );
  }

  if (props.name === "countdownTimer") {
    return (
        <button
          className={css.countdownTimer}
          id={props.id}
          onClick={props.onClick}
        >
          {props.children}
        </button>
    );
  }
  if (props.type === "roundedEdges") {
    return (
        <button
          className={css.roundedEdges}
          id={props.id}
          onClick={props.onClick}
        >
          {props.children}
        </button>
    );
  }
  if (props.name === "Stop") {
    return (
        <button className={css.stopTimer} id={props.id} onClick={props.onClick}>
          {props.children}
        </button>
    );
  }

  if(props.name ==="Start"){
    return(
      <button className={css.startTimer} id={props.id} onClick={props.onClick}>
          {props.children}
        </button>
    )
  }
  return (

      <button className={css.circular} id={props.id} onClick={props.onClick}>
        {props.children}
      </button>
  );
};

export default Button;
