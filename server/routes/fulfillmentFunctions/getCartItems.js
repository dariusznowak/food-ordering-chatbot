const User = require("../../models/User");

async function getCartItems(data) {
  const userId = data.session.split("bot-session")[1];

  let cartItems = await User.find({ _id: userId });

  let totalCost = 0;

  if (cartItems[0].cart.length === 0) {
    return false;
  }

  cartItems[0].cart.map((item) => {
    totalCost += item.price;
  });

  const payload = {
    cartItems,
    totalCost,
    messageType: "cart_items_list",
  };

  return payload;
}

module.exports = getCartItems;
