const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const secret = "secret1234";

router.post("/login", (req, res) => {
  const { login, password } = req.body;

  User.findOne({ login }).then((userInfo) => {
    const passOk = bcrypt.compareSync(password, userInfo.password);
    if (passOk) {
      jwt.sign({ id: userInfo._id, login }, secret, (err, token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res
            .cookie("token", token)
            .json({ id: userInfo._id, login: userInfo.login })
            .sendStatus(200);
        }
      });
    } else {
      res.sendStatus(401);
    }
  });
});

router.post("/logout", (req, res) => {
  res.cookie("token", "").send();
});

module.exports = router;
