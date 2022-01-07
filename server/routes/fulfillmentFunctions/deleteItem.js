const Food = require("../../models/Food");
const User = require("../../models/User");

async function deleteItem(data) {
  const userId = data.session.split("bot-session")[1];
  const itemNumber = data.queryResult.parameters.itemNumber;
  let resultMessage;
  let cartItemToDeleteId;
  let cartItemsData = await User.find({ _id: userId });

  if (cartItemsData[0].cart.length === 0) {
    resultMessage = "Couldn't delete anything. Basket is empty!";
    return resultMessage;
  } else if (itemNumber > cartItemsData[0].length || itemNumber < 0) {
    resultMessage = "Wrong item number! Please choose correct one from cart.";
    return resultMessage;
  }

  cartItems = cartItemsData[0].cart.map((item, index) => {
    if (index + 1 == itemNumber) {
      cartItemToDeleteId = item.itemId;
      itemName = item.itemName;
    }
  });

  await User.updateOne(
    { _id: userId },
    { $pull: { cart: { itemId: cartItemToDeleteId } } },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  try {
    resultMessage = 'Deleted "' + itemName + '" item from basket';
  } catch {
    resultMessage = "Something went wrong. Couldn't delete item.";
  }

  return resultMessage;
}

module.exports = deleteItem;
