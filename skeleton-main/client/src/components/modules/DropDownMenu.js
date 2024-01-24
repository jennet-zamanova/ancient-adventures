import React, { useState, useEffect } from "react";

const DropDownMenu = (props) => {
  return (
    <div>
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
