/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const ALL_COUNTRIES = ["Turkmenistan, Kazahkstan, Uzbekistan, Tajikistan, Kyrgyzstan"];

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Country = require("./models/country");
const Place = require("./models/place");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// get all countries
router.get("/countries", (req, res) => {
  res.send(ALL_COUNTRIES);
});

router.get("/places", (req, res) => {
  console.log("country:", req.query.country);
  Country.find().then((places) => {
    console.log("all places", places);
  });
  Country.find({ country: req.query.country }).then((placesObj) => {
    console.log("placesObj", placesObj);
    res.send(placesObj[0].places);
  });
});

router.get("/place", (req, res) => {
  Place.find({ placeIdx: req.query.placeIdx }).then((placeObj) => {
    res.send(placeObj);
    // console.log(placeObj);
  });
});

router.get("/place/user", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    console.log("userId", req.query.userId);
    res.send(user.likedPlaces.includes(req.query.placeIdx));
  });
});

const updateUser = async (req, res) => {
  const [likedPlaces, likedCountries, id] = req;

  try {
    await User.updateOne(
      { _id: id },
      {
        $set: {
          likedPlaces: likedPlaces,
          likedCountries: likedCountries,
        },
      }
    );

    // Handle success (send a response, etc.)
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    // Handle error (send an error response, log the error, etc.)
    console.error("Update failed:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

router.post("/place/user", (req, res) => {
  User.findById(req.body.userId).then((user) => {
    let likedPlaces = user.likedPlaces;
    let likedCountries = user.likedCountries;
    if (likedPlaces.includes(req.body.placeIdx)) {
      if (likedPlaces.length === 1) {
        likedCountries = [];
      }
      likedPlaces = likedPlaces.filter((item) => item !== req.body.placeIdx);
    } else {
      console.log("liked placess", likedPlaces);
      console.log("liked countriess", likedCountries);
      if (likedPlaces.length === 0) {
        likedCountries.push(req.body.country);
      }
      likedPlaces.push(req.body.placeIdx);
    }
    // if (likedCountries.includes(req.body.country)) {
    //   likedCountries = likedCountries.filter((item) => item !== req.body.country);
    // } else {
    //   likedCountries.push(req.body.country);
    // } TODO manage more than one country
    console.log("locations", likedPlaces, likedCountries);
    updateUser([likedPlaces, likedCountries, req.body.userId], res);
  });
});

router.get("/wishlist", (req, res) => {
  console.log(req.query);
  if (req.query.userId !== undefined && req.query.userId !== "undefined") {
    User.findById(req.query.userId).then((user) => {
      res.send({ likedPlaces: user.likedPlaces, likedCountries: user.likedCountries });
    });
  } else {
    console.log("please log in");
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
