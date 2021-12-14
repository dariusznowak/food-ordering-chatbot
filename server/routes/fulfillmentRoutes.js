//fulfillmentRoutes.js backup

const express = require("express");
const mongoose = require("mongoose");
const { WebhookClient } = require("dialogflow-fulfillment");

// const cookieParser = require("cookie-parser");

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
// const Food = require("../models/Food");

const { Payload } = require("dialogflow-fulfillment");

const getFoodCategories = require("./fulfillmentFunctions/getFoodCategories.js");
const getRestaurantFromCategory = require("./fulfillmentFunctions/getRestaurantFromCategory.js");

// const secret = "secret123";

router.post("/fulfillment", async (req, res) => {
  let intent = req.body.queryResult.intent.displayName;

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

  //tworzenie payload'a z kategoriami jedzenia
  intentMap.set("orderFood", async (agent) => {
    await agent.add(req.body.queryResult.fulfillmentText);
    const payload = await getFoodCategories();
    await agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  });

  //TODO: Trzeba zrobic obsluge tego intentu z dialogflow. Komponent odpowiedzialny za wyswietlanie restauracji z danej
  // kategorii juz jest i dziala
  //tworzenie payload'a z restauracjami z podanej kategorii
  //intentMap.set("choose food category", async (agent) => {
  intentMap.set("orderFood.chooseCategory", async (agent) => {
    agent.add(req.body.queryResult.fulfillmentText);
    //console.log(req.body.queryResult.parameters.foodcategory);
    const payload = await getRestaurantFromCategory(
      req.body.queryResult.parameters.foodcategory
    );
    // const payload = await getRestaurantFromCategory(parameter - np: dialogflow zczytal ze chcę pizzę);
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  });

  agent.handleRequest(intentMap);
});

module.exports = router;
