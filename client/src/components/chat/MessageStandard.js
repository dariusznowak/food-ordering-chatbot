import React from "react";
import "./MessageStandard.css";

function MessageStandard(props) {
  let className;

  if (props.isReceiver === "true")
    className = "message__standard message__received";
  else className = "message__standard";

  console.log(className);
  return (
    <div className={className}>
      <p>This is sample message...</p>
    </div>
  );
}

export default MessageStandard;
