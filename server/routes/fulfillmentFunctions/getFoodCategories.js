const Food = require("../../models/Food");

async function getFoodCategories() {
  //tutaj powinno mi wyslac liste kategorii do frontendu

  const food = await Food.find({});
  // const food = new Food({
  //   categoryName: "Indian",
  //   categoryImgUrl:
  //     "https://images.ctfassets.net/uexfe9h31g3m/4L61DHFmM8XRx1yrPjbZxc/4abddf99032667a9777cd99e51c1dbe1/butter-chicken.jpg?w=1024&h=768&fm=webp&fit=thumb&q=90",
  //   categoryImgAlt: "indian_food_category_img",
  // });
  // food.save();

  // const find = await Food.find({ categoryName: "Russian" });
  // console.log(find);
  // find[0].restaurants.push({
  //   restaurantName: "Namaste Kitchen",
  //   menu: [],
  //   restaurantImgUrl:
  //     "https://cdn.vox-cdn.com/thumbor/wQU4ORHifH3j3y5twsX0U0kAbD0=/0x0:3024x3024/1270x953/filters:focal(1271x1271:1753x1753):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/64036178/Arun_Indian_Kitchen.0.jpg",
  //   restaurantImgAlt: "namaste_kitchen_img",
  // });

  // find.save();
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Food.findOneAndUpdate(
  //   { categoryName: "Kebab" },
  //   {
  //     $push: {
  //       restaurants: {
  //         restaurantName: "Bukhoro Kebab",
  //         menu: [],
  //         restaurantImgUrl:
  //           "https://static.takeaway.com/images/chains/pl/kebab_king/products/kebab_rolada.png?timestamp=1638806149",
  //         restaurantImgAlt: "casta_restaurant_img",
  //       },
  //     },
  //   },
  //   { upsert: true }, //callbackfuntion
  //   function (error, success) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log(success);
  //     }
  //   }
  // );

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Food.updateOne(
  //   //przyklad wstawienia przepisu do odpowiedniej restauracji
  //   //PRZYDA SIE przy DODAWANIU DO KOSZYKA i TWORZENIU ZAMOWIEN
  //   {
  //     "restaurants.restaurantName": "Zaika Indian Food",
  //   },
  //   {
  //     $push: {
  //       "restaurants.$.menu": {
  //         // $ - ten znaczek dynamicznie wskazuje na indeks subdocument'u
  //         itemName: "Tandoori Mix Grill",
  //         itemDescription:
  //           "A tasty combination of tandoori chicken, chicken tikka, lamb tikka, sheek kebab and tandoori king prawn",
  //         price: 12.5,
  //       },
  //     },
  //   },
  //   { upsert: true }, //callbackfuntion
  //   function (error, success) {
  //     if (error) {
  //       console.log(error);
  //     }
  //     // else {
  //     //   console.log(success);
  //     // }
  //   }
  // );

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const test = await Food.findOne({
  //   categoryName: "Kebab",
  //   "restaurants.restaurantName": "Kebab Center",
  // });
  // console.log(test);

  const payload = {
    food,
    messageType: "food_categories",
  };

  return payload;
  //!!!TO DO 12.12.21 - prawdopodobnie frontend nie potrafi zczytywac wszystkich wiadomosci od chatbota (wyswietla tylko tą pierwszą!!!)

  //!!TO DO 12.12.21 - pracowac dalej z payloadem!!!
  //https://github.com/dialogflow/dialogflow-fulfillment-nodejs/issues/267
  //https://dialogflow-fulfillment.readthedocs.io/en/latest/api/rich-responses/?highlight=payload
}

module.exports = getFoodCategories;
