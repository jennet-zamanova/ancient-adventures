import React, { useEffect, useState } from "react";
import Places from "./Places.js";
import { useLocation } from "react-router-dom";

import "../../utilities.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";
import place from "../../../../server/models/place.js";

const Explore = (props) => {
  // const [countries, setCountries] = useState(["Turkmenistan"]);
  const [places, setPlaces] = useState([]);
  const [selectedCountry, setCountry] = useState("");
  let data;
  const location = useLocation();
  const country = location.state?.country;

  const getCountries = (country = "") => {
    if (country === "") {
      // get countries from db
      get("/api/countries/").then((countriesObj) => {
        console.log("selecting THE COUNTRY:", countriesObj);
        const idx = getRandomInt(0, countriesObj.length - 1);
        setCountry(countriesObj[idx]);
      }); //TODO
    } else {
      setCountry(country);
    }
  };

  const getPlacesFromCountry = async (country) => {
    // get places from db
    await get("/api/places/", { country: country }).then((placesObj) => {
      setPlaces(placesObj);
      data = placesObj;
      console.log("this is data", data);
    });
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomNumbersInRange = (count, min, max) => {
    const randomNumbers = [];

    while (randomNumbers.length < count) {
      const randomNumber = getRandomInt(min, max);

      // Ensure that the randomly generated number is not already in the array
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }

    return randomNumbers;
  };
  const selectPlacesRandomly = async () => {
    await getPlacesFromCountry(selectedCountry);
    console.log("getting places finished");
    const randomIdx = getRandomNumbersInRange(getRandomInt(2, data.length - 1), 0, data.length - 1);
    console.log("idx", randomIdx);
    setPlaces(Array.from(randomIdx).map((index) => data[index]));
  };

  useEffect(() => {
    console.log("props: ", country);
    if (country === undefined) {
      getCountries();
    } else {
      getCountries(country);
    }
  }, []);
  useEffect(() => {
    if (selectedCountry !== "") {
      selectPlacesRandomly();

      console.log("selected country", selectedCountry);
    }
    console.log("selected country", selectedCountry);
  }, [selectedCountry]);
  //   useEffect(() => {
  //     selectPlacesRandomly(countries);
  //   }, []);
  useEffect(() => {
    console.log("useplaces", places);
  }, [places]);

  return (
    <>
      <Places
        selectedPlaces={places}
        userId={props.userId}
        handleLogin={props.handleLogin}
        country={selectedCountry}
      />
    </>
  );
};

export default Explore;
