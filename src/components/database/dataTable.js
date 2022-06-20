import React from "react";
import * as css from "./dataTable.module.scss";
import "./dataTable.css";
import "./dataTable.module.scss";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import DisplayArrayElement from "./DisplayArrayElement";
const DataTable = ({ data, updateData, sortTable }) => {
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
  // const DisplayArrayElement = (element) => {
  //   // console.log("Inside DisplayArrayElement");
  //   let date = element["Date"].toDate().toLocaleString();
  //   let docID = element.docID;
  //   return (
  //     <tr className={css.tr} key={docID}>
  //       <td>{element.Location}</td>
  //       <td>{element.TeamOne}</td>
  //       <td>{element.TeamTwo}</td>
  //       <td>{element.TeamOneScore + "-" + element.TeamTwoScore}</td>
  //       <td>{date}</td>
  //       <td>{element.Creator}</td>
  //       <td onClick={() => deleteScore(docID)} className={css.redTextCell}>
  //         <p className={css.redText}> X </p>
  //       </td>
  //     </tr>
  //   );
  // };

  return (
    <table className={css.Table}>
      <thead>
        <tr id="Header" className={css.tr}>
          <th onClick={() => sortTable("Location")}>Location</th>
          <th onClick={() => sortTable("TeamOne")}>Team One </th>
          <th onClick={() => sortTable("TeamTwo")}>Team Two </th>
          <th onClick={() => sortTable("TeamOneScore")}>Score</th>
          <th onClick={() => sortTable("Date")}>Match Date</th>
          <th onClick={() => sortTable("Creator")}>Creator</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((element) => (
          <DisplayArrayElement
            element={element}
            deleteScore={deleteScore}
            css={css}
          />
        ))}
      </tbody>
      {console.log("We rendered the table")}
    </table>
  );
};

export default DataTable;
