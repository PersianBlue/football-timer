import React from "react";
import "./css.module.scss";
import * as css from "./css.module.scss";

const Button = (props) => {
  //const styles = []
    return (
    <div>
      <button className = {css.circular} id = {props.id} onClick = {props.onClick}>{props.children}</button>
    </div>
  
  )
};
  
  
export default Button;
