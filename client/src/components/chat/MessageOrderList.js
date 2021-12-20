import React from "react";
import "./MessageCart.css";
import "./MessageOrderList.css";
import { nanoid } from "nanoid";

function MessageOrderList(props) {
  let orderList = props.data.orderList.listValue.values;

  let temp = [];
  for (let i = orderList.length - 1; i >= 0; i--) {
    temp.push(orderList[i]);
  }
  orderList = temp;

  let customStyle = {};
  if (orderList.length === 1) {
    customStyle = { overflow: "visible", minHeight: "auto" };
  }

  return (
    <div
      className="messageCart__body messageOrderList__body"
      style={customStyle}
    >
      {orderList.map((order, index) => {
        let itemList = order.structValue.fields.items.listValue.values;
        let orderDate = order.structValue.fields.createdAt.stringValue;
        const orderDay = orderDate.split("T")[0];
        let orderHour = orderDate.split("T")[1];
        orderHour = orderHour.substring(0, 8);
        orderDate = orderDay + " " + orderHour;

        return (
          <div className="messageOrderList__singleOrder" key={nanoid()}>
            <div className="messageOrderList__header">
              <div>#{index + 1} Order date:</div>
              {orderDate}
            </div>
            <div className="messageOrderList__deliveryAddress">
              <div>Deliver address:</div>
              {order.structValue.fields.deliveryAddress.stringValue}
            </div>
            <div className="messageOrderList__singleOrderItems">
              <div key={nanoid()}>
                {itemList.map((item, index) => {
                  return (
                    //TODO zamienic na komponent bo to jest powtarzanie kodu!!!
                    <div className="messageOrderList__itemsBox" key={nanoid()}>
                      <div className="messageCart__itemName">
                        {index + 1}.{" "}
                        {item.structValue.fields.itemName.stringValue}
                      </div>
                      <div className="messageCart__priceAndQuantity">
                        <div className="messageCart__quantity">
                          QTY: {item.structValue.fields.quantity.numberValue}
                        </div>

                        <div className="messageCart__price">
                          total: {item.structValue.fields.price.numberValue} zł
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="messageCart__totalCost"
                style={{ fontWeight: "700" }}
              >
                <div>TOTAL COST:</div>
                12 zł
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageOrderList;
