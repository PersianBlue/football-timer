import React from "react";
import * as css from "./dataTable.module.scss";
import "./dataTable.css";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const DataTable = ({ data, updateData }) => {
  console.log("Rendering Data Table");
  //deletes match with given document ID from "matches" collection in Firestore
  //bug fix: also runs updateData from parent component to fix sync issues
  const deleteScore = async (docID) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      deleteDoc(doc(db, "matches", docID)).then(() => {
        console.log("Document deleted");
        updateData();
      });
    } else {
      console.log("Delete operation canceled");
    }
  };

  //renders each individual table row
  const DisplayArrayElement = (element) => {
    console.log("Inside DisplayArrayElement");
    let date = element["Date"].toDate().toLocaleString();
    let docID = element.docID;
    return (
      <tr className={css.tr} key={docID}>
        <td>{element.Location}</td>
        <td>{element.TeamOne}</td>
        <td>{element.TeamTwo}</td>
        <td>{element.TeamOneScore + "-" + element.TeamTwoScore}</td>
        <td>{date}</td>
        <td onClick={() => deleteScore(docID)} className={css.redTextCell}>
          <p className={css.redText}> X </p>
        </td>
      </tr>
    );
  };

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
