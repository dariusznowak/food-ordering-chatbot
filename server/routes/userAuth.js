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
      res.json({
        id: userInfo._id,
        fullName: userInfo.fullName,
        login: userInfo.login,
        residence: userInfo.residence,
        isAuth: true,
      });
      // console.log("you are logged in");
    });
  } catch (e) {
    // console.log(
    //   "You are probably not logged in."
    // );
    res.json({ isAuth: false });
  }
});

module.exports = router;
