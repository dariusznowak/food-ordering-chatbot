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
const getItemsFromRestaurant = require("./fulfillmentFunctions/getItemsFromRestaurant.js");
const addItemToCart = require("./fulfillmentFunctions/addItemToCart.js");
const getCartItems = require("./fulfillmentFunctions/getCartItems.js");
const changeQuantityOfItem = require("./fulfillmentFunctions/changeQuantityOfItem");
const deleteItem = require("./fulfillmentFunctions/deleteItem");

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

  intentMap.set("orderFood.chooseCategory", async (agent) => {
    agent.add(req.body.queryResult.fulfillmentText);
    //console.log(req.body.queryResult.parameters.foodcategory);
    const payload = await getRestaurantFromCategory(
      req.body.queryResult.parameters.foodcategory
    );
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  });

  intentMap.set("selectCategoryWithoutSeeingOptions", async (agent) => {
    agent.add(req.body.queryResult.fulfillmentText);
    //console.log(req.body.queryResult.parameters.foodcategory);
    const payload = await getRestaurantFromCategory(
      req.body.queryResult.parameters.foodcategory
    );
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  });

  // console.log(req.body);

  intentMap.set("chooseIndianRestaurant", async (agent) => {
    agent.add(req.body.queryResult.fulfillmentText);
    const payload = await getItemsFromRestaurant(
      req.body.queryResult.parameters.indianrestaurant
    );
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  });

  intentMap.set("choosePizzaRestaurant", async (agent) => {
    agent.add(req.body.queryResult.fulfillmentText);
    console.log(req.body);
    const payload = await getItemsFromRestaurant(
      req.body.queryResult.parameters.pizzarestaurant
    );
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  });

  intentMap.set("chooseKebabRestaurant", async (agent) => {
    agent.add(req.body.queryResult.fulfillmentText);
    const payload = await getItemsFromRestaurant(
      req.body.queryResult.parameters.kebabrestaurant
    );
    agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  });

  intentMap.set("chooseKebabRestaurant.addItemToCart - yes", async (agent) => {
    const addToCartResult = await addItemToCart(req.body);
    addToCartResult !== ""
      ? agent.add('"' + addToCartResult + '" item added to cart')
      : agent.add("Wrong item number! Please try again.");
  });

  intentMap.set("choosePizzaRestaurant.addItemToCart - yes", async (agent) => {
    const addToCartResult = await addItemToCart(req.body);
    addToCartResult !== ""
      ? agent.add('"' + addToCartResult + '" item added to cart')
      : agent.add("Wrong item number! Please try again.");
  });

  intentMap.set("chooseIndianRestaurant.addItemToCart - yes", async (agent) => {
    const addToCartResult = await addItemToCart(req.body);
    addToCartResult !== ""
      ? agent.add('"' + addToCartResult + '" item added to cart')
      : agent.add("Wrong item number! Please try again.");
  });

  //intent do wyswietlania koszyka
  intentMap.set("showCart", async (agent) => {
    const payload = await getCartItems(req.body);
    if (payload != false) {
      agent.add(req.body.queryResult.fulfillmentText);
      agent.add(
        new Payload(agent.UNSPECIFIED, payload, {
          rawPayload: true,
          sendAsMessage: true,
        })
      );
    } else {
      agent.add("Your basket is empty");
    }
  });

  //intent do zmiany ilosci wskazanego itemu z koszyka
  intentMap.set("showCart.changeQuantityOfItem", async (agent) => {
    const resultMessage = await changeQuantityOfItem(req.body);
    agent.add(resultMessage);
    if (resultMessage !== "You can't change anything in empty basket!") {
      const payload = await getCartItems(req.body);
      agent.add(
        new Payload(agent.UNSPECIFIED, payload, {
          rawPayload: true,
          sendAsMessage: true,
        })
      );
    }
  });

  //intent do usuniecia calej ilosci wskazanego itemu z koszyka
  intentMap.set("showCart.deleteItem", async (agent) => {
    const resultMessage = await deleteItem(req.body);
    agent.add(resultMessage);
    if (resultMessage !== "Couldn't delete anything. Basket is empty!") {
      const payload = await getCartItems(req.body);
      agent.add(
        new Payload(agent.UNSPECIFIED, payload, {
          rawPayload: true,
          sendAsMessage: true,
        })
      );
    }
  });

  agent.handleRequest(intentMap);
});

module.exports = router;
