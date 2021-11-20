const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const secret = "secret123";

router.get("/user", (req, res) => {
  //chcemy uzyc tokenu ktory jest w naszym ciasteczku
  try {
    const payload = jwt.verify(req.cookies.token, secret);
    User.findById(payload.id).then((userInfo) => {
      //   console.log("userInf = " + userInfo);
      // res.json(userInfo);
      res.json({ id: userInfo._id, login: userInfo.login, isAuth: true });
      //nastepnie w App.js dalej dzialamy
      console.log("you are logged in");
    });
  } catch (e) {
    console.log(
      "You are probably not logged in. Mozliwe że obsluga tego bledu jest niekompletna!!!"
    );
    res.json({ isAuth: false });
  }
});

module.exports = router;
