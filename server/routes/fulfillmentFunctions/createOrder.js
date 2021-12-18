const Food = require("../../models/Food");
const User = require("../../models/User");

async function createOrder(data) {
  const userId = data.session.split("bot-session")[1];
  const itemNumber = data.queryResult.parameters.itemNumber;
  let resultMessage;
  let cartItemToDeleteId;
  let cardodwywalenia
  fsalfjsalfjsalfkjsalkfj
  
  
  //wkleic tu kod z fulfillmentRoutes.js!!!!!!!!!!!!!!!!!!!!!!!!
  bazy!
    { _id: userId },
    { $pull: { cart: { itemId: cartItemToDeleteId } } },
    // { safe: true, multi: true },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  try {
    // await User.deleteOne({ _id: userId, "cart.itemId": cartItemToChangeId });

    resultMessage = 'Deleted "' + itemName + '" item from basket';
  } catch {
    resultMessage = "Something went wrong. Couldn't delete item.";
  }

  return resultMessage;
}

module.exports = createOrder;
