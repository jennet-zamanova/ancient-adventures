import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Country from "../modules/Country";

import "../../utilities.css";
import "./Skeleton.css";

import { get, post } from "../../utilities";

const WishList = (props) => {
  const [likedCountries, setCountries] = useState([]);
  const [likedPlaces, setPlaces] = useState([]);
  const [placeImg, setPlaceImg] = useState("");

  const getPlaceInformation = (placeNumber) => {
    // get Image and Description from db
    get("/api/place/", { placeIdx: placeNumber }).then((placeInfo) => {
      setPlaceImg("data:image/jpg;base64," + placeInfo.img);
      return placeImg;
    });
  };
  useEffect(() => {
    get("/api/wishlist/", { userId: props.userId }).then((locations) => {
      setCountries(locations.likedCountries);
      setPlaces(locations.setPlaces);
    });
  }, []);

  return (
    <>
      <>Wishlist</>
      <>
        {likedCountries.map((country) => {
          <>
            {country} <button>Travel</button>
          </>;

          {
            likedPlaces.map((place) => {
              <img src={getPlaceInformation(place)}></img>;
            });
          }
        })}
      </>
    </>
  );
};

export default WishList;
