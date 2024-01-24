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
    setPlaceNum((placeNum + 1) % 2);
    getPlaceInformation(placeNum);
  };

  const getPlaceInformation = (placeNumber) => {
    // get Image and Description from db
    get("/api/place/", { placeIdx: props.selectedPlaces[placeNumber] }).then((placeInfo) => {
      setPlaceImg("data:image/jpg;base64," + placeInfo.img);
      setPlaceDescription(placeInfo.description);
      console.log("this is number", placeNumber);
      console.log(placeImg);
    });
  };

  useEffect(() => {
    getPlaceInformation(0);
  }, []);

  return (
    <div style={{ backgroundImage: { placeImg } }}>
      {pageNum == 0 ? (
        <button
          onClick={handleClickDown}
          className="Places-downclick"
          style={{ backgroundImage: { downClick } }}
        >
          V
        </button>
      ) : (
        <>
          <Like
            userId={props.userId}
            placeIdx={props.selectedPlaces[placeNum]}
            handleLogin={props.handleLogin}
            country={props.country}
          />
          <>{placeDescription}</>
          {placeNum > props.selectedPlaces ? (
            <></>
          ) : (
            <button
              onClick={handleClickRight}
              className="Places-rightclick"
              style={{ backgroundImage: { rightClick } }}
            >
              V
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Places;
