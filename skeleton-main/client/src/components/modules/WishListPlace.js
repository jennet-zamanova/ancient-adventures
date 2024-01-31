import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Country from "../modules/Country";

import "../../utilities.css";
import "../pages/Skeleton.css";
import "../pages/WishList.css";

import { get, post } from "../../utilities";

const WishListPlace = (props) => {
  const [placesToRender, setPlacesToRender] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const getPlaceInformation = async (placeNumber) => {
    // get Image and Description from db
    let imgname = "";
    await get("/api/place/", { placeIdx: placeNumber }).then((placeInfo) => {
      if (placeInfo != []) {
        imgname = "data:image/jpg;base64," + placeInfo[0].img;
      }
    });
    return imgname;
  };

  const fetchPlaceInformation = async (place) => {
    try {
      const placeInfo = await getPlaceInformation(place);
      const imgClassName =
        "WishList-placeImg " +
        (props.selectedPlacesW !== undefined && props.selectedPlacesW.includes(place)
          ? "WishList-placeImg-selected"
          : "WishList-placeImg-notSelected");
      return (
        <img
          className={imgClassName}
          key={place}
          src={placeInfo}
          onClick={() => {
            props.handleClick(place, props.country, props.selectedPlacesW);
          }}
        ></img>
      );
    } catch (error) {
      console.error(`Error fetching place information for ${place}:`, error);
      return null;
    }
  };
  const renderPlaces = async () => {
    if (props.places && props.places.length > 0) {
      const renderedPlaces = await Promise.all(props.places.map(fetchPlaceInformation));
      setPlacesToRender(renderedPlaces.filter((place) => place !== null));
    }
  };
  useEffect(() => {
    setDataReady(false);
    renderPlaces();
  }, [props.selectedPlacesW]);

  useEffect(() => {
    if (placesToRender !== null) {
      setDataReady(true);
    }
  }, [placesToRender]);

  return (
    <>
      {dataReady ? (
        <></>
      ) : (
        <div style={{ fontWeight: "normal", fontSize: "16px", color: "black" }}>Loading...</div>
      )}
      {placesToRender}
    </>
  );
};

export default WishListPlace;
