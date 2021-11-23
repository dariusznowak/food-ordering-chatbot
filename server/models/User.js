const mongoose = require("mongoose");

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

      cart: {
        totalcost: { type: String },
        products: [{}],
      },

      //
    },
    {
      timestamps: true,
    }
  )
);

module.exports = User;
