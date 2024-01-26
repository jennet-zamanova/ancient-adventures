import React, { useEffect, useState, useRef } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Like.css";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";

import greyHeart from "/client/images/grey-heart.svg";
import redHeart from "/client/images/red-heart.svg";

const GOOGLE_CLIENT_ID = "858506206421-kcggq02bpfo0ntheakfd0fnd6k5pm19m.apps.googleusercontent.com";

const Like = (props) => {
  const [isLiked, setLiked] = useState(undefined);
  const [isClicked, setClicked] = useState(false);
  const googleLoginRef = useRef(null);
  const initiateSignIn = () => {
    // Check if the Google Login component is mounted
    if (googleLoginRef.current) {
      // Call the signIn method to initiate the sign-in
      googleLoginRef.current.signIn();
      props.handleLogin();
    }
  };
  useEffect(() => {
    if (props.userId) {
      get("/api/place/user", { userId: props.userId, placeIdx: props.placeIdx }).then(
        (isLikedValue) => {
          setLiked(isLikedValue);
        }
      );
    }
  }, []);
  useEffect(() => {
    if (isLiked !== undefined && isClicked && props.userId !== undefined) {
      console.log(props.userId);
      post("/api/place/user", {
        userId: props.userId,
        isLiked: isLiked,
        country: props.country,
        placeIdx: props.placeIdx,
      }).then(() => {
        console.log("like changed to ", isLiked);
        setClicked(false);
      });
    }
  }, [isClicked]);

  const handleClick = () => {
    console.log(props.userId);
    if (props.userId == undefined) {
      console.log("initiate sign in");
      initiateSignIn();
    }
    setLiked(!isLiked);
    setClicked(true);
  };
  return (
    <>
      <button onClick={handleClick} className="Like-heartButton">
        {
          isLiked ? (
            <img src={redHeart} className="Like-heart" /> //red
          ) : (
            <img src={greyHeart} className="Like-heart" />
          ) //grey
        }
      </button>
      <div style={{ display: "none" }}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            ref={googleLoginRef}
            onSuccess={props.handleLogin}
            onError={(err) => console.log(err)}
          />
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default Like;
