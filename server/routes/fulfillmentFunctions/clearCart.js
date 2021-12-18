const User = require("../../models/User");

async function clearCart(userId) {
  await User.updateOne(
    //znowu problematycznie z baza - tak sie usuwa z bazy!
    { _id: userId },
    { $set: { cart: [] } },
    function (err) {
      if (err) {
        console.log(err);
        return false;
      }
    }
  );

  return true;
}

module.exports = clearCart;
