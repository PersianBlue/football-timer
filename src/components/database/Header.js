import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import "./dataTable.css";

const Header = ({ displayText, sortText, sortTable }) => {
  const [clicked, setClicked] = useState(false);

  const handleClicks = (SortText, Event) => {
    console.log(Event.target.id);
    setClicked(!clicked);
    sortTable(SortText);
    console.log("Clicked!");
  };

  return (
    <th onClick={(Event) => handleClicks(sortText, Event)} id={displayText}>
      {displayText}{" "}
      <span id="sort">
        <FontAwesomeIcon icon={faSort} />
      </span>
    </th>
  );
};

export default Header;
