const Food = require("../../models/Food");
const User = require("../../models/User");

async function changeQuantityOfItem(data) {
  const userId = data.session.split("bot-session")[1];
  const itemNumber = data.queryResult.parameters.itemNumber;
  const newQuantity = data.queryResult.parameters.newQuantity;
  let restaurantName;
  let price;
  let cartItemToChangeId;
  let cartItemsData = await User.find({ _id: userId });
  let itemName;
  let resultMessage;

  if (cartItemsData[0].cart.length === 0) {
    resultMessage = "You can't change anything in empty basket!";
    return resultMessage;
  }

  if (itemNumber > cartItemsData[0].length || itemNumber < 0) {
    resultMessage = "Wrong item number! Please choose correct one from cart.";
    if (newQuantity < 1) {
      resultMessage = "Wrong item number and item amount!";
    }
    return resultMessage;
  } else if (
    newQuantity < 1 &&
    itemNumber > 0 &&
    itemNumber < cartItemsData[0].length
  ) {
    resultMessage = "Wrong amount!";
    return resultMessage;
  }

  cartItems = cartItemsData[0].cart.map((item, index) => {
    if (index + 1 == itemNumber) {
      cartItemToChangeId = item.itemId;
      restaurantName = item.restaurantName;
      price = item.price / item.quantity;
      itemName = item.itemName;
    }
  });

  try {
    await User.updateOne(
      { _id: userId, "cart.itemId": cartItemToChangeId },
      {
        $set: {
          "cart.$.quantity": newQuantity,
          "cart.$.price": price * newQuantity,
        },
      }
    );
  } catch {
    resultMessage = "Something went wrong. Couldn't change quantity.";
  }

  resultMessage = "Changed quantity of " + itemName + " to " + newQuantity;

  return resultMessage;
}

module.exports = changeQuantityOfItem;
