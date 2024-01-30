import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../utilities.css";
import "./DropDownMenu.css";
const DropDownMenu = (props) => {
  return (
    <div className="u-flexColumn dropdown-container">
      <ul className="dropdown-content">
        {props.countries.map((item, index) => (
          <li key={index}>
            {console.log(item)}
            <Link to="/explore/" state={{ country: item }}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownMenu;
