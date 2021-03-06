const express = require("express");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");
const router = express.Router();
const User = require("../models/User");
const getFoodCategories = require("./fulfillmentFunctions/getFoodCategories.js");
const getRestaurantFromCategory = require("./fulfillmentFunctions/getRestaurantFromCategory.js");
const getItemsFromRestaurant = require("./fulfillmentFunctions/getItemsFromRestaurant.js");
const addItemToCart = require("./fulfillmentFunctions/addItemToCart.js");
const getCartItems = require("./fulfillmentFunctions/getCartItems.js");
const changeQuantityOfItem = require("./fulfillmentFunctions/changeQuantityOfItem");
const deleteItem = require("./fulfillmentFunctions/deleteItem");
const clearCart = require("./fulfillmentFunctions/clearCart");
const getOrders = require("./fulfillmentFunctions/getOrders");

router.post("/fulfillment", async (req, res) => {
  let detectedIntent = req.body.queryResult.intent.displayName;
  const agent = new WebhookClient({ request: req, response: res });

  let intentMap = new Map();

  intentMap.set("Default Fallback Intent", async (agent) => {
    agent.add("I didn't understand");
    agent.add("I'm sorry, can you try again?");
  });

  intentMap.set("Welcome", async (agent) => {
    const userId = req.body.session.split("bot-session")[1];
    const user = await User.findOne({ _id: userId });
    const fullName = user.fullName.split(" ")[0];
    agent.add(`Hello ${fullName}! How can I help you?`);
  });

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

  if (
    detectedIntent === "chooseIndianRestaurant" ||
    detectedIntent === "choosePizzaRestaurant" ||
    detectedIntent === "chooseKebabRestaurant"
  ) {
    intentMap.set(detectedIntent, async (agent) => {
      agent.add(req.body.queryResult.fulfillmentText);
      const payload = await getItemsFromRestaurant(
        req.body.queryResult.parameters.restaurantName
      );
      agent.add(
        new Payload(agent.UNSPECIFIED, payload, {
          rawPayload: true,
          sendAsMessage: true,
        })
      );
    });
  }

  if (
    detectedIntent === "chooseKebabRestaurant.addItemToCart - yes" ||
    detectedIntent === "choosePizzaRestaurant.addItemToCart - yes" ||
    detectedIntent === "chooseIndianRestaurant.addItemToCart - yes"
  ) {
    intentMap.set(detectedIntent, async (agent) => {
      const addToCartResult = await addItemToCart(req.body);
      if (addToCartResult !== "") {
        agent.add('"' + addToCartResult + '" item added to cart');
        const payload = await getItemsFromRestaurant(
          req.body.queryResult.parameters.restaurantName
        );
        agent.add(
          new Payload(agent.UNSPECIFIED, payload, {
            rawPayload: true,
            sendAsMessage: true,
          })
        );
      } else {
        agent.add("Wrong item number! Please try again.");
      }
    });
  }

  if (detectedIntent === "showCart" || detectedIntent === "createOrder") {
    intentMap.set(detectedIntent, async (agent) => {
      const payload = await getCartItems(req.body);
      if (payload != false) {
        detectedIntent === "showCart" &&
          agent.add(req.body.queryResult.fulfillmentText);
        agent.add(
          new Payload(agent.UNSPECIFIED, payload, {
            rawPayload: true,
            sendAsMessage: true,
          })
        );
        detectedIntent === "createOrder" &&
          agent.add(req.body.queryResult.fulfillmentText);
      } else {
        agent.add("Your basket is empty");
      }
    });
  }

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

  intentMap.set("createOrder.confirmCart - yes", async (agent) => {
    const userId = req.body.session.split("bot-session")[1];
    const user = await User.findOne({ _id: userId });
    agent.add(
      "Delivery address: " +
        user.residence +
        ". " +
        req.body.queryResult.fulfillmentText
    );
  });

  intentMap.set(
    "createOrder.confirmCart.confirmAddress - yes",
    async (agent) => {
      const userId = req.body.session.split("bot-session")[1];
      const user = await User.findOne({ _id: userId });
      let error = false;
      let totalCost = 0;
      user.cart.forEach((item) => {
        totalCost += item.price;
      });

      User.updateOne(
        { _id: userId },
        {
          $push: {
            orders: { items: user.cart, deliveryAddress: user.residence },
          },
        },
        (err) => {
          if (err) {
            agent.add("Something went wrong");
            error = true;
          } else {
            agent.add(
              req.body.queryResult.fulfillmentText +
                " " +
                totalCost +
                " z?? has been placed"
            );
          }
        }
      );

      if (!error) {
        let wasCartCleared = await clearCart(userId);
        if (!wasCartCleared) {
          agent.add("Something went wrong");
        }
      }
    }
  );

  intentMap.set("clearCart - yes", async (agent) => {
    const userId = req.body.session.split("bot-session")[1];
    let wasCartCleared = await clearCart(userId);
    if (!wasCartCleared) {
      agent.add("Something went wrong");
    } else {
      agent.add(req.body.queryResult.fulfillmentText);
    }
  });

  intentMap.set(
    "createOrder.confirmCart.confirmAddress.enterNewAddress - yes",
    async (agent) => {
      let deliveryAddress =
        req.body.queryResult.parameters.deliveryAddress["street-address"];
      const userId = req.body.session.split("bot-session")[1];
      const user = await User.findOne({ _id: userId });
      let error = false;
      let totalCost = 0;
      user.cart.forEach((item) => {
        totalCost += item.price;
      });

      User.updateOne(
        { _id: userId },
        {
          $push: {
            orders: { items: user.cart, deliveryAddress: deliveryAddress },
          },
        },
        (err) => {
          if (err) {
            agent.add("Something went wrong");
            error = true;
          } else {
            agent.add(
              req.body.queryResult.fulfillmentText +
                " " +
                totalCost +
                " z?? has been placed"
            );
          }
        }
      );

      if (!error) {
        let wasCartCleared = await clearCart(userId);
        if (!wasCartCleared) {
          agent.add("Something went wrong");
        }
      }
    }
  );

  intentMap.set("showOrders", async (agent) => {
    const payload = await getOrders(req.body);
    if (payload == false) {
      agent.add("You don't have any past orders");
    } else {
      agent.add(req.body.queryResult.fulfillmentText);
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
