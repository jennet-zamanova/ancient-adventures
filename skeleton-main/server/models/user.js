const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  likedLocations: { type: Array, default: [] },
  likedPlaces: { type: Array, default: [] },
  likedCountries: { type: Array, default: [] },
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
