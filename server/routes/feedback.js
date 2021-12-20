const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");

router.post("/feedback", async (req, res) => {
  User.updateOne(
    { login: req.body.login },
    {
      $push: {
        feedback: req.body.feedbackInput,
      },
    },
    (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
