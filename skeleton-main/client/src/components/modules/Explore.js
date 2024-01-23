import React, { useEffect, useState } from "react";
import Places from "./Places.js";

import "../../utilities.css";

import { socket } from "../../client-socket.js";

import { get, post } from "../../utilities";

const Explore = (props) => {
  const [countries, setCountries] = useState([]);
  const [places, setPlaces] = useState([]);

  const getCountries = () => {
    // get countries from db
    get("/api/countries/").then((countriesObj) => {
      setCountries(countriesObj);
    });
  };

  const getPlacesFromCountry = (country) => {
    // get places from db
    get("/api/places/", { country: country }).then((placesObj) => {
      setPlaces(placesObj);
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
  const selectPlacesRandomly = (countries) => {
    if (countries == []) {
      countries = getCountries();
    }
    console.log("the countries", countries);
    const selectedCountry = countries[getRandomInt(0, countries.length)];
    const allPlaces = getPlacesFromCountry(selectedCountry);
    const randomIdx = getRandomNumbersInRange(
      getRandomInt(2, allPlaces.length - 1),
      0,
      allPlaces.length
    );
    setPlaces(Array.from(randomIdx).map((index) => allPlaces[index]));
  };

  useEffect(getCountries, []);
  useEffect(selectPlacesRandomly(countries), [countries]);

  return (
    <>
      This is Explore
      <Places selectedPlaces={places} userId={props.userId} handleLogin={props.handleLogin} />
    </>
  );
};

export default Explore;
