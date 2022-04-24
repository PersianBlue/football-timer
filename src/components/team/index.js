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
        <div style = {{borderColor: 'black' ,borderStyle: "solid",}} class = {css.divStyle} >
            <h1 className = {css.h1}>{name}</h1>
            <h3 style = {{textAlign: "center"}}>{score}</h3>
            <div class = {css.inner} style={{fontSize: 24, margin: 10, float: "center",width: "auto",}}>
                <Button  type = "roundedEdges" onClick = {()=> decrementScore()}> - </Button>
            </div>
            <div class = {css.inner} style={{fontSize: 24}}>
                <Button  type = "roundedEdges" onClick = {()=> incrementScore()}> + </Button>
            </div>
          
        </div>
    )
}

export default Team