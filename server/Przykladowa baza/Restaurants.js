//Bedzie kolekcja Restaurats - czyli tablica Restaurant'ów
Restaurants = [
  {
    _id: "1",
    name: "Mekong",
    categoryID: "1", //id z kolekcji Categories
    menu: [
      //tablica produktow
      {
        _id: "1",
        name: "Hanoi Chicken",
        description: "Traditional Hanoi Chicken, medium spicy",
        image:
          "https://www.dinneratthezoo.com/wp-content/uploads/2015/04/sesame-chicken-1.jpg",
        price: 23.99,
      },
      {
        _id: "2",
        name: "Pho Soup",
        description: "Delicious Pho Soup with big chunks of fresh beef",
        image:
          "https://www.recipetineats.com/wp-content/uploads/2019/04/Beef-Pho_6.jpg",
        price: 16.99,
      },
    ],
  },
  {
    _id: "1",
    name: "BurgerMaster",
    categoryID: "2", //id z kolekcji Categories
    menu: [
      //tablica produktow
      {
        _id: "1",
        name: "Cheese burger",
        description: "Traditional burger with cheese, delicious",
        image:
          "https://cdn.w600.comps.canstockphoto.pl/glittery-ser-cielna-cheeseburger-t%C5%82o-zbiory-zdj%C4%99%C4%87_csp10995533.jpg",
        price: 22.99,
      },
      {
        _id: "2",
        name: "Jalapeno burger",
        description:
          "Traditional burger with cheese and spicy jalapeno, delicious",
        image:
          "https://i.pinimg.com/originals/a7/bf/56/a7bf56477eb3835b2c435208396615b1.jpg",
        price: 25.99,
      },
    ],
  },
];
