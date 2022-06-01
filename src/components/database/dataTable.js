import React from "react";
import * as css from "./dataTable.module.scss";
import "./dataTable.css";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const deleteScore = async (ID) => {
  if (window.confirm("Are you sure you want to delete this match?")) {
    await deleteDoc(doc(db, "matches", ID));
    console.log("Document deleted");
  } else {
    console.log("Delete operation canceled");
  }
};

const DisplayArrayElement = (element) => {
  console.log("Inside DisplayArrayElement");
  let date = element["Date"].toDate().toLocaleString();
  console.log(element);
  let ID = element.docID;
  console.log("ID: ", ID);

  return (
    <tr className={css.tr} key={ID}>
      <td>{element.Location}</td>
      <td>{element.TeamOne}</td>
      <td>{element.TeamTwo}</td>
      <td>{element.TeamOneScore + "-" + element.TeamTwoScore}</td>
      <td>{date}</td>
      <td onClick={() => deleteScore(ID)} className={css.redTextCell}>
        <p className={css.redText}> X </p>
      </td>
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
          <th></th>
        </tr>
      </thead>
      <tbody>{data.map((element) => DisplayArrayElement(element))}</tbody>
      {console.log("We rendered the table")}
    </table>
  );
};

export default DataTable;
