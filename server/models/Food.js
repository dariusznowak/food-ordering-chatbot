const mongoose = require("mongoose");

const Item = new mongoose.Schema({
  itemName: { type: String },
  itemDescription: { type: String },
  itemImgUrl: { type: String },
  itemImgAlt: { type: String },
  price: { type: Number },
});

const Restaurant = new mongoose.Schema({
  restaurantName: { type: String, unique: true },
  menu: [Item],
  restaurantImgUrl: { type: String },
  restaurantImgAlt: { type: String },
});

const Food = mongoose.model(
  "Food",
  new mongoose.Schema({
    categoryName: { type: String, unique: true },
    categoryImgUrl: { type: String },
    categoryImgAlt: { type: String },
    restaurants: [Restaurant],
  })
);

module.exports = Food;

// const Menu = mongoose.model(
//   "Menu",
//   new mongoose.Schema({
//     itemName: { type: String },
//     itemDescription: { type: String },
//     itemImgUrl: { type: String },
//     itemImgAlt: { type: String },
//     price: { type: Number },
//   })
// );

// const Restaurant = mongoose.model(
//   "Restaurant",
//   new mongoose.Schema({
//     restaurantName: { type: String, unique: true },
//     menu: [Menu],
//   })
// );
