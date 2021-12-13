//fulfillmentRoutes.js backup

const express = require("express");
const mongoose = require("mongoose");
const { WebhookClient } = require("dialogflow-fulfillment");

// const cookieParser = require("cookie-parser");

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const Food = require("../models/Food");

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

  intentMap.set("order food", async (agent) => {
    agent.add(req.body.queryResult.fulfillmentText);

    //tutaj powinno mi wyslac liste kategorii do frontendu

    const food = await Food.find({});
    // const food = new Food({
    //   categoryName: "Indian",
    //   categoryImgUrl:
    //     "https://images.ctfassets.net/uexfe9h31g3m/4L61DHFmM8XRx1yrPjbZxc/4abddf99032667a9777cd99e51c1dbe1/butter-chicken.jpg?w=1024&h=768&fm=webp&fit=thumb&q=90",
    //   categoryImgAlt: "indian_food_category_img",
    // });

    // food.save();

    const payload = {
      food,
      messageType: "food_categories",
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
