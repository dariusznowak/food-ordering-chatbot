const Food = require("../../models/Food");
const User = require("../../models/User");

async function addItemToCart(data) {
  const itemNumber = data.queryResult.parameters.itemNumber;
  const restaurantName = data.queryResult.parameters.restaurantName;
  const userId = data.session.split("bot-session")[1];

  let restaurantItems = await Food.find({
    "restaurants.restaurantName": restaurantName,
  });

  let itemId;
  let menuItems;
  let itemName = "";
  let itemDescription;
  let price;
  restaurantItems = restaurantItems[0].restaurants.map((element) => {
    if (element.restaurantName === restaurantName) {
      menuItems = element.menu;
    }
  });

  menuItems.map((item, index) => {
    if (itemNumber == index + 1) {
      itemId = item._id;
      itemName = item.itemName;
      itemDescription = item.itemDescription;
      price = item.price;
    }
  });

  const checkIfItemExistsInCart = async () => {
    const user = await User.find({ _id: userId });
    let result = false;

    user[0].cart.map((cartItem) => {
      if (cartItem.itemId == itemId) {
        result = true;
      }
    });
    return result;
  };

  const itemExistsInCart = await checkIfItemExistsInCart();

  if (!itemExistsInCart) {
    User.updateOne(
      { _id: userId },
      {
        $push: {
          cart: {
            itemId,
            itemName,
            itemDescription,
            price,
            restaurantName,
            quantity: 1,
          },
        },
      },
      function (error) {
        if (error) {
          console.log(error);
        }
      }
    );
  } else {
    await User.updateOne(
      { _id: userId, "cart.itemId": itemId },
      { $inc: { "cart.$.quantity": 1, "cart.$.price": price } }
    );
  }

  return itemName;
}

module.exports = addItemToCart;
