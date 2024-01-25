import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Like.css";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";

import greyHeart from "/client/images/grey-heart.svg";
import redHeart from "/client/images/red-heart.svg";

const GOOGLE_CLIENT_ID = "858506206421-kcggq02bpfo0ntheakfd0fnd6k5pm19m.apps.googleusercontent.com";

const Like = (props) => {
  const [isLiked, setLiked] = useState(false);
  useEffect(() => {
    if (props.userId) {
      get("/api/place/user", { userId: props.userId, placeIdx: props.placeIdx }).then(
        (isLikedValue) => {
          setLiked(isLikedValue);
        }
      );
    }
  }, []);

  const handleClick = () => {
    if (props.userId == undefined) {
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
      </GoogleOAuthProvider>;
    }
    setLiked(!isLiked);
    console.log(userId);
    post("/api/place/user", { userId: props.userId, isLiked: isLiked, country: props.country });
  };
  return (
    <button onClick={handleClick} className="Like-heartButton">
      {
        isLiked ? (
          <img src={redHeart} className="Like-heart" /> //red
        ) : (
          <img src={greyHeart} className="Like-heart" />
        ) //grey
      }
    </button>
  );
};

export default Like;
