import React from "react";
import { useEffect, useState, useContext } from "react";
import "./Chat.css";
import MessageStandard from "./MessageStandard";
import MessageFoodCategories from "./MessageFoodCategories";
import MessageRestaurantItems from "./MessageRestaurantItems";
import MessageRestaurants from "./MessageRestaurants";
import MessageCart from "./MessageCart";
import MessageOrderList from "./MessageOrderList";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import Axios from "../../axios";
import { withRouter } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { UserContext } from "../loginAndRegister/UserContext";
import { getEventToTrigger } from "./getEventToTrigger";
import { nanoid } from "nanoid";

function Chat() {
  const [conversations, setConversations] = useState(() => {
    const localStorageData = localStorage.getItem("conversations");
    return localStorageData ? JSON.parse(localStorageData) : [];
  });

  const [eventToTrigger, setEventToTrigger] = useState("");
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (conversations.length === 0) {
      eventQuery("welcomeToMyWebsite");
    }
  });

  function handleEventToTrigger() {
    if (eventToTrigger !== "") {
      eventQuery(eventToTrigger);
      setEventToTrigger("");
    }
  }

  const textQuery = async (text) => {
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
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

    const textQueryVariables = {
      userInfo,
      text: text,
    };

    try {
      const response = await Axios.post(
        "api/dialogflow/textQuery",
        textQueryVariables
      );

      let receivedMessages = [];
      let eventToTrigger;

      response.data.fulfillmentMessages.forEach((element) => {
        if (element.hasOwnProperty("payload")) {
          receivedMessages.push({
            who: "bot",
            content: {
              text: {
                text: element.payload.fields,
              },
            },
            payload: element.payload,
          });

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
      setConversations([...receivedMessages, userMessage, ...conversations]);

      if (eventToTrigger) {
        setEventToTrigger(eventToTrigger);
      }
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

      let conversation = {
        who: "bot",
        content: content,
      };

      setConversations([conversation, ...conversations]);
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
    }
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) {
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
        textQuery(e.target.value);
      }
      e.target.value = "";
      e.preventDefault();
    }
  };

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <div className="chat">
          <div className="chat__body">
            {conversations.map((message) => {
              if (message.hasOwnProperty("payload")) {
                if (
                  message.payload.fields.messageType.stringValue ===
                  "food_categories"
                ) {
                  return (
                    <MessageFoodCategories
                      key={nanoid()}
                      data={message.payload.fields.food.listValue.values}
                    />
                  );
                } else if (
                  message.payload.fields.messageType.stringValue ===
                  "restaurant_list"
                ) {
                  return (
                    <MessageRestaurants
                      key={nanoid()}
                      data={message.payload.fields.restaurants.listValue.values}
                    />
                  );
                } else if (
                  message.payload.fields.messageType.stringValue ===
                  "menu_items_list"
                ) {
                  return (
                    <MessageRestaurantItems
                      key={nanoid()}
                      data={message.payload.fields.menuItems.listValue.values}
                    />
                  );
                } else if (
                  message.payload.fields.messageType.stringValue ===
                  "cart_items_list"
                ) {
                  return (
                    <MessageCart key={nanoid()} data={message.payload.fields} />
                  );
                } else if (
                  message.payload.fields.messageType.stringValue ===
                  "order_list"
                ) {
                  return (
                    <MessageOrderList
                      key={nanoid()}
                      data={message.payload.fields}
                    />
                  );
                }
              }
              return (
                <MessageStandard
                  key={nanoid()}
                  who={message.who}
                  content={message.content.text.text}
                />
              );
            })}
            {eventToTrigger !== "" ? handleEventToTrigger() : true}
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
