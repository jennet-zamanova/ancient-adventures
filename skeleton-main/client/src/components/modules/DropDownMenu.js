import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./DropDownMenu.css";
const DropDownMenu = (props) => {
  return (
    <div className="u-flexColumn dropdown-container">
      <ul className="dropdown-content">
        {props.countries.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownMenu;
