import React from "react";
import { useEffect, useState, useContext } from "react";
import "./Chat.css";
import MessageStandard from "./MessageStandard";
import MessageFoodCategories from "./MessageFoodCategories";
import MessageRestaurantItems from "./MessageRestaurantItems";
import MessageRestaurants from "./MessageRestaurants";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import Axios from "../../axios";

import { withRouter } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

import { UserContext } from "../loginAndRegister/UserContext";

import { getEventToTrigger } from "./getEventToTrigger";

//important!!! wiadomosci musza byc dodawane na poczatek, bo wyswietlane sa od tylu

function Chat() {
  // const [conversations, setConversations] = useState([]);
  const [conversations, setConversations] = useState(() => {
    const localStorageData = localStorage.getItem("conversations");
    return localStorageData ? JSON.parse(localStorageData) : [];
  });

  //tutaj dam sobie stan w ktorym ustawie eventy do strigerowania
  const [eventToTrigger, setEventToTrigger] = useState("");

  const { /*isAuth, setIsAuth, login, setLogin,*/ userInfo } =
    useContext(UserContext);

  //zapisanie wiadomosci do localstorage
  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(
    () => {
      //jezeli localstorage byl pusty to powitaj usera
      if (conversations.length === 0) {
        console.log("local pusty jest to mowi useEffect()");
        eventQuery("welcomeToMyWebsite");
      }
    } /*, []*/
  );

  function handleEventToTrigger() {
    if (eventToTrigger !== "") {
      eventQuery(eventToTrigger);
      setEventToTrigger("");
    }
  }

  // const [toDoTable, setToDoTask] = useState(() => {
  //   const localStorageData = localStorage.getItem("toDoTable");
  //   return localStorageData ? JSON.parse(localStorageData) : [];
  // });

  const textQuery = async (text) => {
    // localStorage.clear();
    // First we need to take care of the message we sent
    // Na poczatku zajmujemy sie wiadomoscią, którą wysyłamy !!!
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
          // dlatego taki format chyba, bo response od api dialogflow ma
          // ma podobnie zapisana wiadomosc
        },
      },
    };

    const userMessage = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };

    // We need to take care of the message chatbot sent
    // Potem zajmujemy się wiadomością zwracaną od chatbota !!!
    const textQueryVariables = {
      userInfo,
      text: text,
    };

    try {
      // robimy requesta do backendu (to /textQuery - za pomocą Axiosa !!!
      const response = await Axios.post(
        "api/dialogflow/textQuery",
        textQueryVariables
      ); //potem server wysyla res
      // requesta ustawiamy tak jak body zwracane z api dialogflow'a !!!
      // const content = response.data.fulfillmentMessages[0];

      let receivedMessages = [];
      // console.log(response.data.fulfillmentMessages);
      let eventToTrigger;

      response.data.fulfillmentMessages.map((element) => {
        if (element.hasOwnProperty("payload")) {
          //TODO - trzeba stworzyc na froncie specjalny typ wiadomosci wyswitlajacy karuzele ze zdjeciami
          receivedMessages.push({
            who: "bot",
            content: {
              text: {
                // text: element.payload.fields,
                text: "to jest food categories",
              },
            },
            payload: element.payload,
          });

          //tutaj mozna by wywolac funkcje ktora jesli trzeba - to wywola event,
          //np. po wyswietleniu restauracji z kategorii "pizza" - wywola sie event,
          //ktory odpali nam odpowiedniego intenta - tutaj bylby to intent, ktory
          //pobieralby ktora pizza restauracje wybieram...
          eventToTrigger = getEventToTrigger(element);
        } else {
          receivedMessages.push({
            who: "bot",
            content: {
              text: {
                text: element.text.text,
              },
            },
          });
        }
      });
      receivedMessages = receivedMessages.reverse();

      //console.log(conversation);
      //console.log(receivedMessages);

      // conversation = {
      //   who: "bot",
      //   content: content,
      // };

      // setConversations([]); //mozna tak na szybko oproznic localstorage
      // setConversations([conversation, userMessage, ...conversations]);
      setConversations([...receivedMessages, userMessage, ...conversations]);

      if (eventToTrigger) {
        // console.log(eventToTrigger);
        setEventToTrigger(eventToTrigger);
      }

      // console.log(conversation);
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error just occured!!!",
          },
        },
      };
      setConversations([conversation, userMessage, ...conversations]);
    }
  };

  const eventQuery = async (event) => {
    // We need to take care of the message chatbot sent
    const eventQueryVariables = {
      userInfo,
      event: event,
    };

    try {
      const response = await Axios.post(
        "api/dialogflow/eventQuery",
        eventQueryVariables
      );

      const content = response.data.fulfillmentMessages[0];

      // console.log("eventQuery siemka");
      // console.log(response.data.fulfillmentMessages);

      let conversation = {
        who: "bot",
        content: content,
      };
      // conversations.push(conversation);

      setConversations([conversation, ...conversations]);

      //console.log(conversation);
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error just occured!!!",
          },
        },
      };
      setConversations([conversation, ...conversations]);
      // console.log(conversation);
    }
  };

  const keyPressHandler = (e) => {
    //e.target.value to wartość w naszym inpucie!!!
    if (e.key === "Enter") {
      if (!e.target.value) {
        // return alert("nie mozna pustej wiadomosci wysylac");
        // TODO done?- nie moze wyskakiwac alert po wyslaniu pustej wiadomosci,
        // zamiast tego - przycisk nie powinien dzialac i nie powinno sie nic dziać
      } else {
        setConversations([
          {
            who: "user",
            content: {
              text: {
                text: e.target.value,
              },
            },
          },
          ...conversations,
        ]);
        // we will send request to text query route
        textQuery(e.target.value);
      }

      e.target.value = "";
      e.preventDefault();
    }
  };

  // const chwilowoTutajJestContent = "To jest testowa wiadomosc";
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="chat">
          <div className="chat__body">
            {/* trzeba bedzie zrobic tak, zeby w conversations byly wszystkie wiadomosci i zeby zwracalo taki komponent jaki trzeba */}

            {conversations.map((message, index) => {
              if (message.hasOwnProperty("payload")) {
                // console.log(message);
                if (
                  message.payload.fields.messageType.stringValue ===
                  "food_categories"
                ) {
                  return (
                    <MessageFoodCategories
                      key={index}
                      // categoryName="Indian"
                      // imgUrl=""
                      // imgAlt=""
                      data={message.payload.fields.food.listValue.values}
                    />
                  );
                } else if (
                  message.payload.fields.messageType.stringValue ===
                  "restaurant_list"
                ) {
                  return (
                    <MessageRestaurants
                      key={index}
                      data={message.payload.fields.restaurants.listValue.values}
                    />
                  );
                } else if (
                  message.payload.fields.messageType.stringValue ===
                  "menu_items_list"
                ) {
                  return (
                    <MessageRestaurantItems
                      key={index}
                      data={message.payload.fields.menuItems.listValue.values}
                    />
                  );
                }
              }
              return (
                <MessageStandard
                  key={index}
                  who={message.who}
                  content={message.content.text.text}
                />
              );
            })}
            {
              //to miejsce to HIT - pół dnia nad tym myślałem;
              //teraz tutaj sie wywoluje funkcja ktora wywoluje EVENT w dialogflow,
              //np. po wybraniu kategorii "pizza" -> odpala sie event ktory wlacza intent
              //odpowiedzialny za
              eventToTrigger !== "" ? handleEventToTrigger() : true
            }
          </div>
          <div className="chat__footer">
            <form>
              <input
                placeholder="Type a message"
                type="text"
                onKeyPress={keyPressHandler}
              />
              <button type="submit" />
            </form>

            <IconButton>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Chat);
