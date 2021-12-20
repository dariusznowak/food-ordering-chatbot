const User = require("../../models/User");

async function getOrders(data) {
  const userId = data.session.split("bot-session")[1];

  let orderList = await User.find({ _id: userId });

  orderList = orderList[0].orders;

  if (orderList.length === 0) {
    return false;
  }

  const payload = {
    orderList,
    messageType: "order_list",
  };

  return payload;
}

module.exports = getOrders;
