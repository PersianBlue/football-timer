import React from "react";
import * as css from "./css.module.scss";

const Button = (props) => {
  return <button className={css.circular}>{props.children}</button>;
};
export default Button;
