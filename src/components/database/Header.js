import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import "./dataTable.css";

const Header = ({ displayText, sortText, sortTable }) => {
  const [clicked, setClicked] = useState(false);
  const handleClicks = (SortText) => {
    sortTable(SortText);
    setClicked(true);
    console.log("Clicked!");
  };

  return (
    <th onClick={() => handleClicks(sortText)}>
      {displayText}{" "}
      {clicked ? (
        <span id="sortUp">
          <FontAwesomeIcon icon={faSortUp} />
        </span>
      ) : (
        <span id="sortDown">
          <FontAwesomeIcon icon={faSortDown} />
        </span>
      )}
    </th>
  );
};

export default Header;
