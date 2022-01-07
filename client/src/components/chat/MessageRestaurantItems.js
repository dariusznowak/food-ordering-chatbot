import React from "react";
import "./MessageRestaurantItems.css";
import { nanoid } from "nanoid";

function MessageRestaurantItems(props) {
  return (
    <div className="itemCard__body">
      {props.data.map((item, index) => {
        return (
          <div className="itemCard__singleCard" key={nanoid()}>
            <div className="itemCard__itemName">
              {"#"}
              {index + 1} {item.structValue.fields.itemName.stringValue}{" "}
            </div>
            <p className="itemCard__description">
              {item.structValue.fields.itemDescription.stringValue}
            </p>
            <div className="itemCard__price">
              {item.structValue.fields.price.numberValue} zł
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageRestaurantItems;
