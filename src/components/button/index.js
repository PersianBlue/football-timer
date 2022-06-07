import React from "react";
//import "./css.module.scss";
import * as css from "./css.module.scss";
import "./button.scss";

const Button = (props) => {
  //creates all the buttons seen on screen
  if (props.name) {
    return (
      <button className={css[props.name]} id={props.id} onClick={props.onClick}>
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

Button.defaultProps = {
  type: "roundedEdges",
};

export default Button;
