import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Country from "../modules/Country";

import "../../utilities.css";
import "./Skeleton.css";
import "./WishList.css";

import { get, post } from "../../utilities";

const WishList = (props) => {
  const [likedCountries, setCountries] = useState([]);
  const [likedPlaces, setPlaces] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [countriesToRender, setCountriesToRender] = useState(null);
  const [placesToRender, setPlacesToRender] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const [hasClickedTravel, setHasClickedTravel] = useState(false);

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

  const handleClickImage = (place) => {
    console.log(selectedPlaces);
    if (selectedPlaces.length !== 0 && selectedPlaces.includes(place)) {
      setSelectedPlaces(selectedPlaces.filter((item) => item !== place));
    } else {
      setSelectedPlaces((selectedPlaces) => [...selectedPlaces, place]);
    }
  };

  const handleClickTravel = (country) => {
    console.log(
      "this function is not yet working. your # of selected places: ",
      selectedPlaces.length,
      " in ",
      country
    );
    setHasClickedTravel(true);
  };

  useEffect(() => {
    const fetchPlaceInformation = async (place) => {
      try {
        const placeInfo = await getPlaceInformation(place);
        console.log("place", place);
        const imgClassName =
          "WishList-placeImg " +
          (selectedPlaces.includes(place)
            ? "WishList-placeImg-selected"
            : "WishList-placeImg-notSelected");
        return (
          <img
            className={imgClassName}
            key={place}
            src={placeInfo}
            onClick={() => {
              handleClickImage(place);
            }}
          ></img>
        );
      } catch (error) {
        console.error(`Error fetching place information for ${place}:`, error);
        return null;
      }
    };

    const renderPlaces = async () => {
      if (likedPlaces && likedPlaces.length > 0) {
        const renderedPlaces = await Promise.all(likedPlaces.map(fetchPlaceInformation));
        setPlacesToRender(renderedPlaces.filter((place) => place !== null));
        console.log("the places", placesToRender);
        setDataReady(true);
      }
    };

    renderPlaces();
  }, [likedPlaces, selectedPlaces]);

  useEffect(() => {
    get("/api/wishlist/", { userId: props.userId }).then((locations) => {
      console.log("locations", locations);
      setCountries(locations.likedCountries);
      setPlaces(locations.likedPlaces);
    });
  }, [props.userId]);

  useEffect(() => {
    if (dataReady) {
      console.log("the data is ready");
      // Update to return JSX elements inside map
      const mappedElements = likedCountries.map((country) => (
        <div key={country} className="WishList-countryText">
          {country}
          <button
            className="WishList-button WishList-button-text"
            onClick={() => {
              handleClickTravel(country);
            }}
          >
            Travel
          </button>
        </div>
      ));
      setCountriesToRender(mappedElements);
    }
  }, [dataReady]);

  useEffect(() => {
    console.log("countries rendered", countriesToRender);
  }, [countriesToRender]);

  return (
    <div className="WishList-container">
      {hasClickedTravel && (
        <div>
          this function is not yet working. your # of selected places: {selectedPlaces.length} in{" "}
          {likedCountries[selectedPlaces.length - 1]}
        </div>
      )}
      {dataReady ? <></> : <div>Loading</div>}
      {countriesToRender}
      <div>{placesToRender}</div>
    </div>
  );
};

export default WishList;
