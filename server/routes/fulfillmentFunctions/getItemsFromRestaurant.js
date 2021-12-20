const Food = require("../../models/Food");

async function getItemsFromRestaurant(restaurantName) {
  let restaurantItems = await Food.find({
    "restaurants.restaurantName": restaurantName,
  });
  let menuItems;
  restaurantItems = restaurantItems[0].restaurants.map((element, index) => {
    if (element.restaurantName === restaurantName) {
      menuItems = element.menu;
    }
  });
  //console.log(menuItems);

  const payload = {
    menuItems,
    messageType: "menu_items_list",
    //categoryName: categoryName,
  };

  return payload;
}

module.exports = getItemsFromRestaurant;
