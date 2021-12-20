const Food = require("../../models/Food");

async function getRestaurantFromCategory(categoryName) {
  let restaurants = await Food.find({ categoryName: categoryName });
  restaurants = restaurants[0].restaurants;

  //console.log(restaurants);

  const payload = {
    restaurants,
    messageType: "restaurant_list",
    categoryName: categoryName,
  };

  return payload;
}

module.exports = getRestaurantFromCategory;
