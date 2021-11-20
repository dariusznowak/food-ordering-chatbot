const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const secret = "secret123";

router.post("/register", (req, res) => {
  // const { login, email, fullName, password } = req.body;
  const { login, password } = req.body;
  //enkrypcja hasła, 10-ile razy bedzie kodowane
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    login,
    // email,
    // fullName,
    password: hashedPassword,
  });

  user.save().then((userInfo) => {
    // console.log(userInfo);
    //zalogujemy uzytkownika po rejestracji
    //wyslemy mu w ciasteczku token
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
            .json({ id: userInfo._id, login: userInfo.login });
        }
      }
      // },
      // { expiresIn: "10h" }
    );
  });
});

module.exports = router;
