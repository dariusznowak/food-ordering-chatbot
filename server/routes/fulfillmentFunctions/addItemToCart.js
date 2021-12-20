const Food = require("../../models/Food");
const User = require("../../models/User");

async function addItemToCart(data) {
  //   const intent = data.queryResult.intent.displayName;
  const itemNumber = data.queryResult.parameters.itemNumber;
  const restaurantName = data.queryResult.parameters.restaurantName;
  const userId = data.session.split("bot-session")[1];

  let restaurantItems = await Food.find({
    "restaurants.restaurantName": restaurantName,
  });

  //na poczatku szukamy id itemu, ktory chcemy dodac do karty
  let itemId;
  let menuItems;
  let itemName = "";
  let itemDescription;
  let price;
  restaurantItems = restaurantItems[0].restaurants.map((element, index) => {
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

  //sprawdzamy jeszcze tylko czy dany item jest juz w koszyku, bo jesli TAK - to
  //zwiekszamy tylko jego quantity;
  //jezeli NIE - to dodajemy caly obiekt z quantity=1
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

  //na podstawie id itemu oraz id usera wiemy, ktory item dodac do czyjej karty, robimy to ponizej
  if (!itemExistsInCart) {
    User.updateOne(
      //WAZNE! Wywalilem "await" bo mi dodawalo 2 razy to samo - nie wiem czemu??????!!!
      // await User.updateOne(
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
      //   { upsert: true },
      function (error, success) {
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
