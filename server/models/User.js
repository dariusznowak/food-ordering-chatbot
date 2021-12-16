const mongoose = require("mongoose");

// const CartItem = new mongoose.Schema({
//   totalCost: { type: Number },
//   items: [
//     {
//       itemId: { type: String },
//       quantity: { type: Number },
//     },
//   ],
// });

// const Cart = new mongoose.Schema({
//   totalCost: { type: Number },
//   items: [CartItem],
// });

const CartItem = new mongoose.Schema({
  itemId: { type: String },
  //sprobuje dla ulatwienia dodac tutaj cale obiekty (a nie samo id), zeby nie
  //trzeba bylo potem robic zapytac po id'kach itp.
  itemName: { type: String },
  itemDescription: { type: String },
  price: { type: Number },
  restaurantName: { type: String },

  quantity: { type: Number },
});

const Order = new mongoose.Schema(
  {
    //status: { type: String },
    // totalCost: { type: Number },
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

      cart: [CartItem],
      orders: [Order],
      // cart: [Cart],
      // orders: [Order],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = User;
