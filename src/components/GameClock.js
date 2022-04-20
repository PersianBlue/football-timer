import React, { useEffect } from 'react'
import {useState} from 'react'

const GameClock = ()=>{
    const [hrs, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);

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
    
    const updateAll = () =>{
        updateSeconds(secs);
        updateMinutes(secs,mins);
        updateHours(mins,hrs);

    }
    console.log(secs,mins,hrs);
    //setInterval(updateAll,1000)

    useEffect( //useEffect solves the re-rendering too many times issue
        () => {
            const handle = setInterval(() => updateAll(),1000);
            return () => clearInterval(handle); //clear interval on unmount
        }
    ) 
    return (
        <div>
         This is the game clock   
        <p>{hrs}:{mins}:{secs}</p>
        </div>
    )

}
export default GameClock