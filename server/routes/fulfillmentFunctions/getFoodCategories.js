const Food = require("../../models/Food");

async function getFoodCategories() {
  const food = await Food.find({});

  const payload = {
    food,
    messageType: "food_categories",
  };

  return payload;
}

module.exports = getFoodCategories;
