import React, { useEffect, useState, useRef } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";
import "./Like.css";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";

import greyHeart from "/client/images/grey-heart.svg";
import redHeart from "/client/images/red-heart.svg";

const GOOGLE_CLIENT_ID = "858506206421-kcggq02bpfo0ntheakfd0fnd6k5pm19m.apps.googleusercontent.com";

const Like = (props) => {
  const navigate = useNavigate();
  const [isLiked, setLiked] = useState(undefined);
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    if (props.userId) {
      get("/api/place/user", {
        userId: props.userId,
        placeIdx: props.placeIdx,
        country: props.country,
      }).then((isLikedValue) => {
        setLiked(isLikedValue);
      });
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
    setLiked(!isLiked);
    setClicked(true);
  };

  const handleClickSignIn = () => {
    console.log("initiate sign in");
    navigate("/signin/");
    setLiked(!isLiked);
    setClicked(true);
  };
  return (
    <>
      {props.userId ? (
        <button onClick={handleClick} className="Like-heartButton">
          {
            isLiked ? (
              <img src={redHeart} className="Like-heart" /> //red
            ) : (
              <img src={greyHeart} className="Like-heart" />
            ) //grey
          }
        </button>
      ) : (
        <button onClick={handleClickSignIn}>
          {" "}
          <img src={greyHeart} className="Like-heart" />
          {/* <Link to="/signin/"></Link> */}
        </button>
      )}
    </>
  );
};

export default Like;
