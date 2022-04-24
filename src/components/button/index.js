import React from "react";
//import "./css.module.scss";
import * as css from "./css.module.scss";

const Button = (props) => {
  //creates all the buttons seen on screen
  //if statements are specific to particular buttons
  if(props.name==="changeSeconds"){
    return (
      <div>
        <button className = {css.changeSeconds} id = {props.id} onClick = {props.onClick}>{props.children}</button>
      </div>
    )
  }

  if(props.name==="resetTimer"){
    return(
      <div>
          <button className = {css.resetTimer} id = {props.id} onClick = {props.onClick}>{props.children}</button>
      </div>
    )
  }

  if(props.name==="countdownTimer"){
    return(
      <div>
          <button className = {css.countdownTimer} id = {props.id} onClick = {props.onClick}>{props.children}</button>
      </div>
    )
  }
  if(props.type==="roundedEdges"){
    return(
      <div>
        <button className = {css.roundedEdges} id = {props.id} onClick = {props.onClick}>{props.children}</button>
      </div>
    )
  }
  if (props.name==="Stop"){
    return(
      <div>
        <button  className = {css.circular} id = {props.id} onClick = {props.onClick}>{props.children}</button>
      </div>
    )
  }
    return (
    <div>
      <button className = {css.circular} id = {props.id} onClick = {props.onClick}>{props.children}</button>
    </div>
  
  )
};
  
  
export default Button;
