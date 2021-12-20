import React from "react";
import "./MessageFoodCategories.css";
import { nanoid } from "nanoid";

function MessageFoodCategories(props) {
  return (
    <div className="messageFoodCategories__body">
      {props.data.map((foodCategory) => {
        return (
          <div key={nanoid()}>
            <p className="messageFoodCategories__name">
              {foodCategory.structValue.fields.categoryName.stringValue.toUpperCase()}
            </p>
            <img
              src={foodCategory.structValue.fields.categoryImgUrl.stringValue}
              alt={foodCategory.structValue.fields.categoryImgAlt.stringValue}
            ></img>
          </div>
        );
      })}
    </div>
  );
}

export default MessageFoodCategories;
