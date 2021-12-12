const mongoose = require("mongoose");

const Food = mongoose.model(
  "Food",
  new mongoose.Schema({
    categoryName: { type: String, unique: true },
    categoryImgUrl: { type: String },
    imgAlt: { type: String },
  })
);

module.exports = Food;
