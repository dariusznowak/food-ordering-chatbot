import React from "react";
import { useEffect } from "react";
import "./Chat.css";
import MessageStandard from "./MessageStandard";
import SendIcon from "@mui/icons-material/Send";
import { backdropClasses, IconButton } from "@mui/material";

//important!!! wiadomosci musza byc dodawane na poczatek, bo wyswietlane sa od tylu

function Chat() {
  return (
    <div className="chat">
      <div className="chat__body">
        <MessageStandard isReceiver="true" />
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="true" />
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="true" />
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="true" />
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="true" />
        <MessageStandard isReceiver="false" />
      </div>
      <div className="chat__footer">
        <form>
          <input placeholder="Type a message" type="text" />
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
