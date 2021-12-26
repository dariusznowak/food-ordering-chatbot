//fulfillmentRoutes.js backup

const express = require("express");
// const mongoose = require("mongoose");
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
const clearCart = require("./fulfillmentFunctions/clearCart");
const getOrders = require("./fulfillmentFunctions/getOrders");

// const secret = "secret123";

router.post("/fulfillment", async (req, res) => {
  let detectedIntent = req.body.queryResult.intent.displayName;
  const agent = new WebhookClient({ request: req, response: res });

  let intentMap = new Map(); //to intents map we have intents with fulfillment enabled

  intentMap.set("Default Fallback Intent", async (agent) => {
    agent.add("I didn't understand");
    agent.add("I'm sorry, can you try again?");
  });

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

  //intent do wyboru kategorii w dowolnym momencie rozmowy
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

  //intenty do wyboru restauracji
  if (
    detectedIntent === "chooseIndianRestaurant" ||
    detectedIntent === "choosePizzaRestaurant" ||
    detectedIntent === "chooseKebabRestaurant"
  ) {
    intentMap.set(detectedIntent, async (agent) => {
      agent.add(req.body.queryResult.fulfillmentText);
      const payload = await getItemsFromRestaurant(
        //podajemy nazwe restauracji np. "Casta Restaurant"
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

  //intenty do dodawania wybranego itemu do koszyka
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
          //znowu to samo co wyzej, podajemy nazwe restauracji
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

  //intent do wyswietlania koszyka (rowniez przed potwierdzeniem zamowienia)
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

  //intent pytajacy o potwierdzenie adresu zamowienia
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

  //intent tworzacy zamowienie w bazie - po potwierdzeniu adresu
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

      console.log(totalCost);
      console.log(
        "totalCosttotalCosttotalCosttotalCosttotalCosttotalCosttotalCosttotalCosttotalCosttotalCosttotalCosttotalCosttotalCosttotalCost"
      );

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
                " zł has been placed"
            );
          }
        }
      );

      //po dodaniu orderu nalezy wyczyscic koszyk
      if (!error) {
        let wasCartCleared = await clearCart(userId);
        if (!wasCartCleared) {
          agent.add("Something went wrong");
        }
      }
    }
  );

  //intent czyszczacy koszyk
  intentMap.set("clearCart - yes", async (agent) => {
    const userId = req.body.session.split("bot-session")[1];
    let wasCartCleared = await clearCart(userId);
    if (!wasCartCleared) {
      agent.add("Something went wrong");
    } else {
      agent.add(req.body.queryResult.fulfillmentText);
    }
  });

  //intent dodajacy zamowienie z nowym adresem dostawy
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
                " zł has been placed"
            );
          }
        }
      );

      //po dodaniu orderu nalezy wyczyscic koszyk
      if (!error) {
        let wasCartCleared = await clearCart(userId);
        if (!wasCartCleared) {
          agent.add("Something went wrong");
        }
      }
    }
  );

  //intent do wyswietlania orderow
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
