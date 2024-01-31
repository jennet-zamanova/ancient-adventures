import React, { useState, useEffect, useRef } from "react";
import { get } from "../../utilities";
import WishListPlace from "../modules/WishListPlace";

const WishList = (props) => {
  const [likedCountries, setCountries] = useState([]);
  const [countriesToRender, setCountriesToRender] = useState(null);
  const selectedPlacesRef = useRef({});
  const [likedPlaces, setPlaces] = useState([]);
  const [hasClickedTravel, setHasClickedTravel] = useState(false);
  const [travelTips, setTravelTips] = useState("");

  const handleClickImage = (place, country) => {
    const selPlaces = { ...selectedPlacesRef.current };

    if (
      selectedPlacesRef.current !== undefined &&
      selectedPlacesRef.current[country] !== undefined &&
      selectedPlacesRef.current[country].includes(place)
    ) {
      // need to remove
      selPlaces[country] = selectedPlacesRef.current[country].filter((item) => item !== place);
    } else {
      // need to add
      if (selPlaces[country] === undefined) {
        selPlaces[country] = [place];
      } else {
        selPlaces[country] = [...selPlaces[country], place];
      }
    }

    selectedPlacesRef.current = selPlaces;
    setCountriesToRender((prev) => [...prev]); // Trigger a re-render
    console.log("after", selectedPlacesRef.current);
  };

  const handleClickTravel = (country) => {
    console.log(selectedPlacesRef.current);
    get("/api/travel/", { selectedPlaces: selectedPlacesRef.current[country] }).then((tipsObj) => {
      setTravelTips(tipsObj.result);
    });
    console.log("Loading");
    delete selectedPlacesRef.current[country];
  };

  useEffect(() => {
    if (travelTips !== "") {
      setHasClickedTravel(true);
    }
  }, [travelTips]);

  useEffect(() => {
    get("/api/wishlist/", { userId: props.userId }).then((locations) => {
      console.log("locations", locations);
      setCountries(locations.map((obj) => obj.country));
      setPlaces(locations);
    });
  }, [props.userId]);

  useEffect(() => {
    console.log("selected places", selectedPlacesRef.current);
    if (likedCountries) {
      console.log("the data is ready");
      // Update to return JSX elements inside map
      const mappedElements = likedCountries.map((country) => (
        <div key={country} className="WishList-countryText">
          <div>
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
          <>
            {console.log(selectedPlacesRef.current)}
            <WishListPlace
              handleClick={handleClickImage}
              places={likedPlaces.find((obj) => obj.country === country).likedPlaces}
              selectedPlacesW={selectedPlacesRef.current[country]}
              country={country}
            />
          </>
        </div>
      ));
      setCountriesToRender(mappedElements);
    }
  }, [likedCountries, selectedPlacesRef.current]);

  return (
    <div className="WishList-container">
      {countriesToRender}
      {hasClickedTravel && <div>Here are some travel tips {travelTips}</div>}
    </div>
  );
};

export default WishList;
