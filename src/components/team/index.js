import React from 'react'
import {useState} from 'react'
import Button from "../button"
import * as css from "./css.module.scss";


const Team = ({name,ID}) =>{
const [score,setScore] = useState(0);

const incrementScore = ()=>{
    setScore(score+1);
}

const decrementScore = () =>{
    setScore(score -1);
}
    
    return(
        <div style = {{borderColor: '#black' ,borderStyle: "solid",}} class = {css.inner}>
            <h1 className = {css.h1}>{name}</h1>
            <p>{score}</p>
            <div class = {css.inner}>
                <Button  type = "rounded edges" onClick = {()=> decrementScore()}> - </Button>
            </div>
            <div class = {css.inner}>
                <Button  type = "rounded edges" onClick = {()=> incrementScore()}> + </Button>
            </div>
          
        </div>
    )
}

export default Team