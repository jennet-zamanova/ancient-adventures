import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import DropDownMenu from "../modules/DropDownMenu";

import "../../utilities.css";
import "./Skeleton.css";
// require("dotenv").config();

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "858506206421-kcggq02bpfo0ntheakfd0fnd6k5pm19m.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const countries = ["Turkmenistan", "Uzbekistan", "Kazakhstan", "Tajikistan", "Kyrgyzstan"];

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };
  return (
    <div className="NavBar-container u-flex u-textCenter u-flex-justifyCenter">
      <Link to="/" className="u-bold NavBar-title">
        AncientAdventures
      </Link>
      <div className="u-flex u-flex-alignCenter NavBar-linkContainer">
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="u-flex">
          <Link className="NavBar-link" to="/explore/">
            Central Asia
          </Link>
          {isDropdownVisible ? <DropDownMenu countries={countries} /> : <></>}
        </div>
        <Link to="/cuisine/" className="NavBar-link">
          Cuisine
        </Link>
        <Link to="/culture/" className="NavBar-link">
          Culture
        </Link>
      </div>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} className="NavBar-login">
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

export default Skeleton;
