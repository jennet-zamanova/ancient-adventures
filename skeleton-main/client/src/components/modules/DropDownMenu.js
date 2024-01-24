import React, { useState, useEffect } from "react";
import "../../utilities.css";
const DropDownMenu = (props) => {
  return (
    <div className="u-flexColumn">
      <ul>
        {props.countries.map((item) => {
          <li>
            <p>{item}</p>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default DropDownMenu;
