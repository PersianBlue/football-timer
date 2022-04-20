import React from 'react'
import {useState} from 'react'
import Button from "../button/Button"

const Team = ({name,ID}) =>{
const [score,setScore] = useState(0);

const incrementScore = ()=>{
    setScore(score+1);
}

const decrementScore = () =>{
    setScore(score -1);
}
    
    return(
        <div>
            <h1>{name}</h1>
            <p>{score}</p>
            <Button onClick = {()=> decrementScore()}> - </Button>
            <Button onClick = {()=> incrementScore()}> + </Button>
        </div>
    )
}

export default Team