const mongoose = require("mongoose");

const likedLocationsSchema = new mongoose.Schema({
  country: String,
  likedPlaces: Array,
});

// compile model from schema
module.exports = mongoose.model("LikedLocations", likedLocationsSchema);
