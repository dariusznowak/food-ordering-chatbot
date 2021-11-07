import React from "react";
import "./Chat.css";
import MessageStandard from "./MessageStandard";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

function Chat() {
  return (
    <div className="chat">
      <div className="chat__body">
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="true" />
        <MessageStandard isReceiver="false" />{" "}
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="true" />
        <MessageStandard isReceiver="false" />{" "}
        <MessageStandard isReceiver="false" />
        <MessageStandard isReceiver="true" />
        <MessageStandard isReceiver="false" />{" "}
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
