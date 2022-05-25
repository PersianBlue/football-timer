import React from "react";
import * as css from "./dataTable.module.scss";
import "./dataTable.css";

const DisplayArrayElement = (element) => {
  console.log("Inside DisplayArrayElement");
  let date = element["Date"].toDate().toLocaleString();

  return (
    <tr className={css.tr}>
      <td>{element.Location}</td>
      <td>{element.TeamOne}</td>
      <td>{element.TeamTwo}</td>
      <td>{element.TeamOneScore + "-" + element.TeamTwoScore}</td>
      <td>{date}</td>
    </tr>
  );
};

const DataTable = ({ data }) => {
  console.log("Rendering Data Table");

  return (
    <table className={css.Table}>
      <thead>
        <tr id="Header" className={css.tr}>
          <th>Location</th>
          <th>Team One </th>
          <th>Team Two </th>
          <th>Score</th>
          <th>Match Date</th>
        </tr>
      </thead>
      <tbody>{data.map((element) => DisplayArrayElement(element))}</tbody>
      {console.log("We rendered the table")}
    </table>
  );
};

export default DataTable;
