const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      //userId
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Order;
