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
  Country.find({ country: req.query.country }).then((placesObj) => {
    res.send(placesObj);
  });
});

router.get("/place", (req, res) => {
  Place.find({ placeIdx: req.query.placeIdx }).then((placeObj) => {
    res.send(placeObj);
  });
});

router.get("/place/user", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user.likedPlaces.includes(req.query.placeIdx));
  });
});

router.post("/place/user", (req, res) => {
  User.findById(req.user.userId).then((user) => {
    const likedPlaces = user.likedPlaces;
    if (likedPlaces.includes(req.user.placeIdx)) {
      likedPlaces = likedPlaces.filter((item) => item !== req.user.placeIdx);
    } else {
      likedPlaces.push(req.user.placeIdx);
    }
    User.updateOne(
      { _id: req.user.userId }, // specify the condition
      {
        $set: {
          likedPlaces: likedPlaces, // specify the field and its new value
        },
      }
    );
  });
});
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
