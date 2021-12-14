const mongoose = require("mongoose");

const CartItem = new mongoose.Schema({
  totalCost: { type: Number },
  items: [
    {
      itemId: { type: String },
      quantity: { type: Number },
    },
  ],
});

const Cart = new mongoose.Schema({
  totalCost: { type: Number },
  items: [CartItem],
});

const Order = new mongoose.Schema(
  {
    //status: { type: String },
    totalCost: { type: Number },
    items: [CartItem],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      //ogolnie to ten schemat moze sie bedzie jeszcze zmienial, moze jakis adres bedzie potrzebny skoro mam w planach zrobic dostawe... ?
      fullName: { type: String },
      login: { type: String, unique: true },
      residence: { type: String },
      phoneNumber: { type: String, unique: true },
      password: { type: String },

      cart: [Cart],
      orders: [Order],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = User;
