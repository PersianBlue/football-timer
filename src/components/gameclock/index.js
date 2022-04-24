import React, { useEffect } from 'react';
import {useState} from 'react';
import Button from "../button";



const GameClock = ()=>{
    //console.log("Re-rendering game clock");
    const [hrs, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);
    const [stopped, setStopped] = useState(false);

    const updateSeconds = ()=>{
        setSecs(secs+1); //each time the function is called, increment seconds
    }

    const updateMinutes = () =>{
        if(secs >=60){  //every 60 secondss
            const newMins = Math.floor(60/secs) //converts & stores all accumulated secs in newMins
            setMins(mins + newMins); //updates mins with newMins
            setSecs(secs%60); //remove 60 from secs, and set it to remainder (incase secs = 65 for e.g)
        }
    }
    const updateHours = ()=>{
        if(mins>=60){
            const newHrs = Math.floor(60/mins);
            setHours(hrs + newHrs);
            setMins(mins%60);
        }
    }

    const resetTimer = ()=>{
        setHours(0);
        setMins(0);
        setSecs(0);
        stopTimer();
    }

    const stopTimer = ()=>{
        if(!stopped){
            console.log("Stopped timer");
            setStopped(true);
        }
        
    }

    const startTimer = ()=>{
        if(stopped){
            setStopped(false);
            console.log("Starting timer");
        }
        
    }
    
    const updateAll = (stopped,isReset) =>{
        if (!stopped){
            //console.log("Updating hh:mm:ss");
            updateSeconds(secs);
            updateMinutes(secs,mins);
            updateHours(mins,hrs);
        }
    }
    //console.log(hrs,mins,secs);
    //setInterval(updateAll,1000)

    useEffect( //useEffect solves the re-rendering too many times issue
        () => {
            const handle = setInterval(() => updateAll(stopped),1000);
            return () => clearInterval(handle); //clear interval on unmount
        }
            
    ) 
    return (
        <div>
            <div style = {{height: 50, width: 150, textAlign: "center", backgroundColor: "white", borderColor: '#black', borderStyle: "solid", display:"inline-block"}}>
             <h1>{mins}:{secs}</h1>

            </div>
            <div style = {{backgroundColor: "black", borderColor: "black", borderStyle: "solid", display: "inline-block" }}>
                <Button name = "Start" onClick = {()=> startTimer()}> Start </Button>
                <Button name = "Stop" onClick = {() =>stopTimer()}> Stop </Button>
            </div>
            <Button  style = {{ width: 100, height: 150}} type = "resetTimer" name = "resetTimer" onClick = {() =>resetTimer()}>Reset Timer </Button>
            <br></br>
            <br></br>


            
        </div>
    )

}
export default GameClock