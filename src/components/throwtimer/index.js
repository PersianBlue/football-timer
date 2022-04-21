import React from 'react';
import Button from "../button"
import {useState,useEffect} from 'react';
import whistleSound from "../../assets/audio/WhistleSoundEffect.mp3"


const ThrowTimer = ()=>{
    const[counter,setCounter] = useState(4);
    const[runCountdown, setRunCountdown] = useState(false);
    const[newCounter, setNewCounter] = useState(4);

    const startCountdown = ()=>{
        console.log("Starting countdown:",runCountdown);
        console.log(runCountdown);
        setRunCountdown(true);
    }
    useEffect(
        ()=>{
            console.log("Inside useEffect");
            console.log(runCountdown)
            console.log(counter);
            if(runCountdown && counter>0){
                console.log("Inside if statement");
                const handle = setInterval(()=>setCounter(counter-1),1000)
                return ()=>clearInterval(handle);

            }else{
                setRunCountdown(false);
                setCounter(newCounter);
            }
            if(counter===0){ //play soundeffect when countdown ends
                var audio = new Audio(whistleSound)
                audio.play();
            }
        },[runCountdown,newCounter,counter] //adding dependencies to avoid infinite updates
    )
    
    const setSeconds = ()=>{
        let seconds = window.prompt("Enter seconds here");
        if(Number.isNaN(seconds) || isNaN(seconds) || seconds===""){
            seconds = counter;
        }
        seconds = parseInt(seconds);
        return setNewCounter(seconds);
    }
  

    return (
        <div>
            <br></br>
            <Button onClick= {()=>setSeconds()}>Change Seconds</Button>
            <Button onClick ={()=>startCountdown()}> {counter}</Button>
            
        </div>
    )

}

export default ThrowTimer