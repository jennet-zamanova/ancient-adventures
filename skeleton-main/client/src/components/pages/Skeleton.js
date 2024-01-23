import React from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "858506206421-1pv0pb0cqnuloni5btod4ah542u5vrp2.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  const handleClick = () => {};
  return (
    <>
      <>AncientAdventures</>
      <>
        <button onClick={handleClick}>Central Asia</button>
        <Link path="/cuisine/">Cuisine</Link>
        <Link path="/culture/">Culture</Link>
      </>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
    </>
  );
};

export default Skeleton;
