//Bedzie kolekcja Users - czyli tablica User'ów
Users = [
  {
    _id: "daroo735",
    fullName: "Dariusz Nowak",
    password: "haslo",

    cart: {
      totalCost: 79.99,
      products: [
        {
          productId: "1",
          quantity: 3,
        },
        {
          productId: "2",
          quantity: 1,
        },
      ],
    },

    orders: [
      {
        _id: "1",
        status: "ACTIVE", //ACTIVE/FINISHED
        totalCost: 59.99,
        products: [
          {
            productId: "1",
            quantity: 3,
          },
          {
            productId: "2",
            quantity: 1,
          },
        ],
      },
      {
        _id: "2",
        status: "FINISHED", //ACTIVE/FINISHED
        totalCost: 49.99, //powinno to byc liczone z cen produktow
        products: [
          {
            restaurantId: "1",
            productId: "2",
            quantity: 3,
          },
          {
            productId: "2",
            quantity: 1,
          },
        ],
      },
    ],

    userMessages: [
      {
        _id: "1",
        textContent: "This is a sample user message",
      },
      {
        _id: "2",
        textContent: "This is another sample user message",
      },
    ],

    chatbotMessages: [
      // moze zrobic jakies rodzaje wiadomosci,
      // a moze zrobic po prostu jeden obiekt wiadomosci,
      // chyba lepiej zrobic rozne rodzaje,
      // np. 1) sam text
      // 2) jakis "carousel" z itemami
      // NA RAZIE TO ZOSTAWMY, BO NIE WIADOMO JAK DIALOGFLOW DZIAŁA
      {
        _id: "1",
        textContent: "This is a sample chatbot response",
      },
      {
        _id: "2",
        textContent: "This is another sample chatbot response",
      },
    ],
  },
];
