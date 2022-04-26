import React from "react";
//import "./css.module.scss";
import * as css from "./css.module.scss";

const Button = (props) => {
  //creates all the buttons seen on screen
  //if statements are specific to particular buttons
  if (props.name) {
    return (
        <button
          className={css[props.name]}
          id={props.id}
          onClick={props.onClick}
        >
          {props.children}
        </button>
    );
  }
  return (

      <button className={css[props.type]} id={props.id} onClick={props.onClick}>
        {props.children}
      </button>
  );
};

export default Button;
