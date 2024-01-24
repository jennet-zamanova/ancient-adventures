import React, { useEffect, useState } from "react";
import Like from "./Like.js";

import "../../utilities.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

const Places = (props) => {
  const [pageNum, setPageNum] = useState(1); // can be 0 or 1

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

  const getPlaceInformation = (placeNumber) => {
    // get Image and Description from db
    get("/api/place/", { placeIdx: props.selectedPlaces[placeNumber] }).then((placeInfo) => {
      setPlaceImg(placeInfo.img);
      setPlaceDescription(placeInfo.description);
    });
  };

  useEffect(() => {
    getPlaceInformation(placeNum);
  }, [placeNum]);

  return (
    <div style={{ backgroundImage: { placeImg } }}>
      {pageNum == 0 ? (
        <button onClick={handleClickDown} />
      ) : (
        <>
          <Like
            userId={props.userId}
            placeIdx={props.selectedPlaces[placeNum]}
            handleLogin={props.handleLogin}
            country={props.country}
          />
          <>{placeDescription}</>
          {placeNum > props.selectedPlaces ? <></> : <button onClick={handleClickRight} />}
        </>
      )}
    </div>
  );
};

export default Places;
