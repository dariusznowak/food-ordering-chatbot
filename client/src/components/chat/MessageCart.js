import React from "react";
import "./MessageCart.css";

function MessageCart(props) {
  const cartItems =
    props.data.cartItems.listValue.values[0].structValue.fields.cart.listValue
      .values;

  return (
    <div className="messageCart__body">
      {/* <p>{props.content}</p> */}
      <div className="messageCart__itemsBoxBody">
        {cartItems.map((item, index) => {
          return (
            <div className="messageCart__itemsBox">
              <div className="messageCart__itemName">
                {index + 1}. {item.structValue.fields.itemName.stringValue}
              </div>
              <div className="messageCart__priceAndQuantity">
                <div className="messageCart__quantity">
                  {/* QTY: errrorr */}
                  QTY: {item.structValue.fields.quantity.numberValue}
                </div>

                <div className="messageCart__price">
                  {/* total: errrorr$ */}
                  total: {item.structValue.fields.price.numberValue} zł
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="messageCart__totalCost" style={{ fontWeight: "700" }}>
        <div>TOTAL COST:</div>
        {props.data.totalCost.numberValue} zł
      </div>
    </div>
  );
}

export default MessageCart;
