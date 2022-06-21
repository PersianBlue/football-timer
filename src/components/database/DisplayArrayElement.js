import React from "react";

const DisplayArrayElement = ({ element, deleteScore, css }) => {
  // console.log("Inside display array element");
  //   console.table(element);
  let date = element["Date"].toDate().toLocaleString();
  //   let date = Date();
  let docID = element.docID;
  return (
    <tr className={css.tr} key={docID}>
      <td>{element.Location}</td>
      <td>{element.TeamOne}</td>
      <td>{element.TeamTwo}</td>
      <td>{element.TeamOneScore + "-" + element.TeamTwoScore}</td>
      <td>{date}</td>
      <td>{element.Creator}</td>
      <td onClick={() => deleteScore(docID)} className={css.redTextCell}>
        <p className={css.redText}> X </p>
      </td>
    </tr>
  );
};

export default DisplayArrayElement;
