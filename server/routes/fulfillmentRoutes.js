//fulfillmentRoutes.js backup

const express = require("express");
const mongoose = require("mongoose");
const { WebhookClient } = require("dialogflow-fulfillment");

// const cookieParser = require("cookie-parser");

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const { Payload } = require("dialogflow-fulfillment");

// const secret = "secret123";

router.post("/fulfillment", async (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  // console.log("######################fulfillment##########################");
  // console.log(req.body);

  const fallback = (agent) => {
    agent.add("I didn't understand");
    agent.add("I'm sorry, can you try again?");
  };
  let intentMap = new Map(); //to intents map we have intents with fulfillment enabled

  intentMap.set("Default Fallback Intent", fallback);

  //test//powitanie usera po imieniu po zalogowaniu
  intentMap.set("Welcome", async (agent) => {
    const userId = req.body.session.split("bot-session")[1];

    const user = await User.findOne({ _id: userId });
    const fullName = user.fullName.split(" ")[0];

    agent.add(`Hello ${fullName}! How can I help you?`);
  });

  intentMap.set("order food", (agent) => {
    agent.add(req.body.queryResult.fulfillmentText);

    //tutaj powinno mi wyslac liste kategorii do frontendu

    const payload = {
      rozmiarDupska: "ogrrrrromna dupa",
      rozmiarButa: 21,
    };
    //!!!TO DO 12.12.21 - prawdopodobnie frontend nie potrafi zczytywac wszystkich wiadomosci od chatbota (wyswietla tylko tą pierwszą!!!)
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
    //!!TO DO 12.12.21 - pracowac dalej z payloadem!!!
    //https://github.com/dialogflow/dialogflow-fulfillment-nodejs/issues/267
    //https://dialogflow-fulfillment.readthedocs.io/en/latest/api/rich-responses/?highlight=payload
  });

  agent.handleRequest(intentMap);
});

module.exports = router;
