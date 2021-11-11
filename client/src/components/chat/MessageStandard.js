import React from "react";
import "./MessageStandard.css";

function MessageStandard(props) {
  let className;

  if (props.who === "user") className = "message__standard message__received";
  else if (props.who === "bot") className = "message__standard";

  return (
    <div className={className}>
      <p>{props.content}</p>
    </div>
  );
}

export default MessageStandard;
