const mongoose = require("mongoose");

const FoodCategory = mongoose.model(
  "FoodCategory",
  new mongoose.Schema({
    name: { type: String, unique: true },
    imageUrl: { type: String },
  })
);

module.exports = FoodCategory;
