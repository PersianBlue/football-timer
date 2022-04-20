import React from "react";
import * as css from "./css.module.scss";

const Button = (props) => {
  return <button className={css.circular} onClick = {props.onClick}>{props.children}</button>;
};
export default Button;
