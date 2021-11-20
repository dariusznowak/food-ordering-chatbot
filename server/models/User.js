const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    //   __id: {type: String}
    //ogolnie to ten schemat moze sie bedzie jeszcze zmienial, moze jakis adres bedzie potrzebny skoro mam w planach zrobic dostawe... ?
    login: { type: String, unique: true },
    // email: { type: String, unique: true },
    // fullName: { type: String },
    password: { type: String },
  })
);

module.exports = User;
