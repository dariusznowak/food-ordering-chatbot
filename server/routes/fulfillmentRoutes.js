const express = require("express");
const mongoose = require("mongoose");
const { WebhookClient } = require("dialogflow-fulfillment");

// const cookieParser = require("cookie-parser");

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const router = express.Router();
// const User = require("../models/User");

// const secret = "secret123";

router.post("/fulfillment", async (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add("Welcome to my fulfillment");
  }

  const fallback = (agent) => {
    agent.add("I didn't understand");
    agent.add("I'm sorry, can you try again?");
  };
  let intentMap = new Map(); //to intents map we have intents with fulfillment enabled
  intentMap.set("order food", welcome);

  intentMap.set("Default Fallback Intent", fallback);

  agent.handleRequest(intentMap);
});

module.exports = router;
