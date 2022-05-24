import React from "react";
import * as css from "./dataTable.module.scss";
import "./dataTable.css";

const DataTable = ({ data }) => {
  const DisplayArrayElement = (element) => {
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
  const arr = data.map((element) => DisplayArrayElement(element));
  return (
    <table className={css.Table}>
      <tr id="Header" className={css.tr}>
        <th>Location</th>
        <th>Team One </th>
        <th>Team Two </th>
        <th>Score</th>
        <th>Match Date</th>
      </tr>
      {arr}
    </table>
  );
};

export default DataTable;
