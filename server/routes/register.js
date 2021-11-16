const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const secret = "secret123";

router.post("/register", (req, res) => {
  const { login, email, fullName, password } = req.body;
  //enkrypcja hasła, 10-ile razy bedzie kodowane
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    //email,fullName i login maja taka sama nazwe jak zmienne => wiec nie trzeba pisac email:email
    login,
    email,
    fullName,
    password: hashedPassword,
  });
  user.save().then((userInfo) => {
    //zalogujemy uzytkownika po rejestracji
    //wyslemy mu w ciasteczku token
    jwt.sign(
      { id: userInfo._id, email: userInfo.email },
      secret,
      (err, token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res
            .cookie("token", token)
            .json({ id: userInfo._id, email: userInfo.email });
        }
      }
    );
  });
});

module.exports = router;
