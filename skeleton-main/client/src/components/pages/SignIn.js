import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import DropDownMenu from "../modules/DropDownMenu";

import "../../utilities.css";
import "./Skeleton.css";
// require("dotenv").config();

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "858506206421-kcggq02bpfo0ntheakfd0fnd6k5pm19m.apps.googleusercontent.com";

const SignIn = ({ userId, handleLogin, handleLogout }) => {
  const navigate = useNavigate();
  return (
    <div className="NavBar-container u-flex u-textCenter u-flex-justifyCenter">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} className="NavBar-login">
        {userId ? (
          <>
            <button
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
            <Link to="/wishlist/" className="NavBar-link u-bold">
              WishList{" "}
            </Link>
          </>
        ) : (
          <>
            {" "}
            <p>Please LogIn first)</p>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleLogin(credentialResponse);
                navigate(-1);
              }}
              onError={(err) => console.log(err)}
            />
          </>
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

export default SignIn;
