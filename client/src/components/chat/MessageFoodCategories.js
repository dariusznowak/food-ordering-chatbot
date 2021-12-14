import React from "react";
import "./MessageFoodCategories.css";

function MessageFoodCategories(props) {
  return (
    <div className="messageFoodCategories__body">
      {/* <p>{props.content}</p> */}

      {props.data.map((foodCategory) => {
        return (
          <div>
            <p>{foodCategory.structValue.fields.categoryName.stringValue}</p>
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
