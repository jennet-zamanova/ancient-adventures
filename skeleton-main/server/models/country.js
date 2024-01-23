const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  country: String,
  places: Array,
});

// compile model from schema
module.exports = mongoose.model("country", CountrySchema);
