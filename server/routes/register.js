const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const secret = "secret1234";

router.post("/register", (req, res) => {
  const { fullName, login, residence, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    fullName,
    login,
    residence,
    password: hashedPassword,
  });

  user.save().then((userInfo) => {
    jwt.sign(
      { id: userInfo._id, login: userInfo.login },
      secret,
      (err, token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res
            .cookie("token", token)
            .json({ id: userInfo._id, login: userInfo.login })
            .sendStatus(200);
        }
      }
    );
  });
});

module.exports = router;
