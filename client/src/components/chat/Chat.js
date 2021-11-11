import React from "react";
import { useEffect, useState } from "react";
import "./Chat.css";
import MessageStandard from "./MessageStandard";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import Axios from "../../axios";

//important!!! wiadomosci musza byc dodawane na poczatek, bo wyswietlane sa od tylu

function Chat() {
  const [conversations, setConversations] = useState([]);
  const [userMessages, setMessages] = useState([]);

  useEffect(() => {
    eventQuery("welcomeToMyWebsite");
  }, []);

  const textQuery = async (text) => {
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
      text: text,
    };

    try {
      // robimy requesta do backendu (to /textQuery - za pomocą Axiosa !!!
      const response = await Axios.post(
        "api/dialogflow/textQuery",
        textQueryVariables
      ); //potem server wysyla res
      // requesta ustawiamy tak jak body zwracane z api dialogflow'a !!!
      const content = response.data.fulfillmentMessages[0];

      conversation = {
        who: "bot",
        content: content,
      };
      setConversations([conversation, userMessage, ...conversations]);

      console.log(conversation);
    } catch (error) {
      conversation = {
        who: "user",
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
      // conversations.push(conversation);

      setConversations([conversation, ...conversations]);

      console.log(conversation);
    } catch (error) {
      let conversation = {
        who: "user",
        content: {
          text: {
            text: "Error just occured!!!",
          },
        },
      };
      setConversations([conversation, ...conversations]);
      console.log(conversation);
    }
  };

  const keyPressHandler = (e) => {
    //e.target.value to wartość w naszym inpucie!!!
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("nie mozna pustej wiadomosci wysylac");
      }
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
      e.target.value = "";
      e.preventDefault();
    }
  };

  // const chwilowoTutajJestContent = "To jest testowa wiadomosc";
  return (
    <div className="chat">
      <div className="chat__body">
        {conversations.map((message, index) => {
          return (
            <MessageStandard
              key={index}
              who={message.who}
              content={message.content.text.text}
            />
          );
        })}
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
  );
}

export default Chat;
