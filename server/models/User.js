const mongoose = require("mongoose");

const CartItem = new mongoose.Schema({
  itemId: { type: String },
  itemName: { type: String },
  itemDescription: { type: String },
  price: { type: Number },
  restaurantName: { type: String },
  quantity: { type: Number },
});

const Order = new mongoose.Schema(
  {
    items: [CartItem],
    deliveryAddress: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      fullName: { type: String },
      login: { type: String, unique: true },
      residence: { type: String },
      password: { type: String },
      cart: [CartItem],
      orders: [Order],
      feedback: [{ type: String }],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = User;
