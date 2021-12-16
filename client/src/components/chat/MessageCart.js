import React from "react";
import "./MessageCart.css";

function MessageCart(props) {
  // console.log(props.data);
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
                  total: {item.structValue.fields.price.numberValue}$
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="messageCart__totalCost">
        <div>TOTAL COST:</div>
        {props.data.totalCost.numberValue} $
      </div>
    </div>

    // <div className="messageFoodCategories__body">
    //   {/* <p>{props.content}</p> */}

    //   {props.data.map((foodCategory) => {
    //     return (
    //       <div>
    //         <p>{foodCategory.structValue.fields.categoryName.stringValue}</p>
    //         <img
    //           src={foodCategory.structValue.fields.categoryImgUrl.stringValue}
    //           alt={foodCategory.structValue.fields.categoryImgAlt.stringValue}
    //         ></img>
    //       </div>
    //     );
    //   })}
    // </div>
  );
}

export default MessageCart;
