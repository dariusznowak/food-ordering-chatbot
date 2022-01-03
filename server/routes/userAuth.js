const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const secret = "secret1234";

router.get("/user", (req, res) => {
  try {
    const payload = jwt.verify(req.cookies.token, secret);
    User.findById(payload.id).then((userInfo) => {
      res
        .json({
          id: userInfo._id,
          fullName: userInfo.fullName,
          login: userInfo.login,
          residence: userInfo.residence,
          isAuth: true,
        })
        .sendStatus(200);
    });
  } catch (e) {
    res.json({ isAuth: false }).sendStatus(401);
  }
});

module.exports = router;
