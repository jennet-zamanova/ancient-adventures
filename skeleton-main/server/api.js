/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
// const ALL_COUNTRIES = ["Turkmenistan", "Kazahkstan", "Uzbekistan", "Tajikistan", "Kyrgyzstan"];
const ALL_COUNTRIES = ["Turkmenistan", "Uzbekistan"];

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Country = require("./models/country");
const Place = require("./models/place");
const LikedLocations = require("./models/likedLocations");

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
    if (placesObj.length != 0) {
      res.send(placesObj[0].places);
    } else {
      res.send([]);
    }
  });
});

router.get("/place", (req, res) => {
  Place.find({ placeIdx: req.query.placeIdx }).then((placeObj) => {
    res.send(placeObj);
  });
});

router.get("/place/user", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    let sendm = false;
    if (user.likedLocations.some((obj) => obj.country === req.query.country)) {
      const location = user.likedLocations.find((obj) => obj.country === req.query.country);
      sendm = location.likedPlaces.includes(req.query.placeIdx);
    }
    res.send(sendm);
  });
});

const updateUser = async (req, res) => {
  const [likedLocations, id] = req;

  try {
    await User.updateOne(
      { _id: id },
      {
        $set: {
          likedLocations: likedLocations,
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
    let likedLocations = user.likedLocations;
    if (likedLocations.some((obj) => obj.country === req.body.country)) {
      // locations of the country
      let location = likedLocations.find((obj) => obj.country === req.body.country);
      // remove that field
      likedLocations = likedLocations.filter((obj) => obj.country !== req.body.country);
      // location is already liked
      if (location.likedPlaces.includes(req.body.placeIdx)) {
        // only one location liked from the country
        if (location.likedPlaces.length !== 1) {
          location.likedPlaces = location.likedPlaces.filter((obj) => obj !== req.body.placeIdx);
          likedLocations.push(location);
        }
      }
      // location is not liked yet
      else {
        location.likedPlaces.push(req.body.placeIdx);
        likedLocations.push(location);
      }
    }
    // no location liked from country yet
    else {
      const location = {};
      location["country"] = req.body.country;
      location["likedPlaces"] = [req.body.placeIdx];
      likedLocations.push(location);
    }
    updateUser([likedLocations, req.body.userId], res); //update mongodb
  });
});

router.get("/wishlist", (req, res) => {
  if (req.query.userId !== undefined && req.query.userId !== "undefined") {
    User.findById(req.query.userId).then((user) => {
      res.send(user.likedLocations);
    });
  } else {
    console.log("please log in");
  }
});

router.get("/travel", (req, res) => {
  Place.find({ placeIdx: { $in: req.query.selectedPlaces.split(",") } }).then((result) => {
    let results = result.map((obj) => obj.travelTips);
    results = results.join(" ");
    res.send({ result: results });
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
