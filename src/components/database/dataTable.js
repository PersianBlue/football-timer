import React from "react";

const DataTable = ({ data }) => {
  const DisplayArrayElement = (element, id) => {
    const { TeamOne, TeamTwo } = element;
    console.log("Observe the team names: ", element);
    console.log("Team One", TeamOne);
    console.log("Team Two: ", TeamTwo);
    // let time = element["Date"].toDate().toGMTString();
    let date = element["Date"].toDate().toLocaleString();
    // date += element["Date"].toDate().toLocaleTimeString();

    return (
      <div>
        <ul>
          <p>Team One: {TeamOne} </p>
          <p>Team One Score: {element.TeamOneScore}</p>
          <p>Team Two: {TeamTwo} </p>
          <p>Team Two Score: {element.TeamTwoScore}</p>
          <p>Match Location: {element.Location}</p>
          <p>Match date: {date}</p>
        </ul>
      </div>
    );
  };
  const arr = data.map((element, index) => DisplayArrayElement(element, index));
  return <div>{arr}</div>;
};

export default DataTable;
