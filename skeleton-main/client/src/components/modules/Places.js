import React, { useEffect, useState } from "react";
import Like from "./Like.js";

import "../../utilities.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";
import downClick from "/client/images/down-click.svg";
import rightClick from "/client/images/right-click.svg";

import "./Places.css";

const Places = (props) => {
  const [pageNum, setPageNum] = useState(0); // can be 0 or 1

  const [placeNum, setPlaceNum] = useState(0); // can be 0-props.places.length
  const [placeImg, setPlaceImg] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");

  const handleClickDown = () => {
    setPageNum((pageNum + 1) % 2);
  };

  const handleClickRight = () => {
    setPageNum(0);
    setPlaceNum(placeNum + 1);
  };

  const handleClickLeft = () => {
    setPageNum(0);
    setPlaceNum(placeNum - 1);
  };

  const getPlaceInformation = (placeNumber) => {
    // get Image and Description from db
    // console.log("placenum", placeNum);
    // console.log("placeIdx", props.selectedPlaces[placeNumber]);
    get("/api/place/", { placeIdx: props.selectedPlaces[placeNumber] }).then((placeInfo) => {
      if (placeInfo[0] != undefined) {
        // console.log("first info", placeInfo[0]);
        setPlaceImg("data:image/png;base64," + placeInfo[0].img);
        setPlaceDescription(placeInfo[0].description);
      }
      console.log("this is number", placeNumber);
      // console.log("this is places infor", placeInfo);
    });
  };

  useEffect(() => {
    console.log("all places", props.selectedPlaces);
  });
  useEffect(() => {
    if (props.selectedPlaces != []) {
      getPlaceInformation(placeNum);
    }
  }, [props.selectedPlaces, placeNum]);

  useEffect(() => {
    console.log("placeImg changed. Component re-rendered.");
    // }
  }, [placeImg]);

  return (
    <div id="place-div-container">
      <img src={placeImg} id="place-div"></img>
      {pageNum == 0 ? (
        <button onClick={handleClickDown} className="Places-downclick Place-click">
          <img src={downClick} />
        </button>
      ) : (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="Places-secondPage">
            <Like
              userId={props.userId}
              placeIdx={props.selectedPlaces[placeNum]}
              handleLogin={props.handleLogin}
              country={props.country}
              className="Places-likeButton"
            />
            <div className="Place-description">{placeDescription}</div>
            {placeNum + 1 >= props.selectedPlaces.length ? (
              <></>
            ) : (
              <>
                <button onClick={handleClickRight} className="Places-rightclick Place-click">
                  <img src={rightClick} />
                </button>
              </>
            )}
            {placeNum === 0 ? (
              <></>
            ) : (
              <button onClick={handleClickLeft} className="Places-leftclick Place-click">
                <img src={rightClick} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Places;
