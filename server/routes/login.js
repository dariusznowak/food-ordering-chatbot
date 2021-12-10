const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const secret = "secret123";

router.post("/login", (req, res) => {
  const { login, password } = req.body;

  User.findOne({ login }).then((userInfo) => {
    //sprawdzamy czy wprowadzone haslo jest poprawne
    const passOk = bcrypt.compareSync(password, userInfo.password);
    //jesli jest ok, to przypisujemy nowy token i wysylamy go razem z response
    if (passOk) {
      jwt.sign({ id: userInfo._id, login }, secret, (err, token) => {
        if (err) {
          //jesli jest blad to wypisujemy go
          console.log(err);
          res.sendStatus(500);
        } else {
          // jesli jest ok to wysylamy response z tokenem oraz json'a z _id i loginem
          res
            .cookie("token", token)
            .json({ id: userInfo._id, login: userInfo.login });
        }
      });
    } else {
      res.sendStatus(401);
    }
  });
});

router.post("/logout", (req, res) => {
  //tutaj usuwamy cookie - wywalamy nasz token
  res.cookie("token", "").send();
  // res.cookie.set("testtoken", { expires: Date.now() });
});

module.exports = router;
