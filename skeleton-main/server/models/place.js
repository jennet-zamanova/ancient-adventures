const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  country: String,
  placeIdx: String,
  img: String,
  description: String,
});

// compile model from schema
module.exports = mongoose.model("place", PlaceSchema);
