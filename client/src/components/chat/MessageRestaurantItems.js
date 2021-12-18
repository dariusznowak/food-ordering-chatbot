import React, { useContext } from "react";
import "./MessageRestaurantItems.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UserContext } from "../loginAndRegister/UserContext";

import { nanoid } from "nanoid";

function MessageRestaurantItems(props) {
  // console.log(props.data);

  const { /*isAuth, setIsAuth, login, setLogin,*/ userInfo } =
    useContext(UserContext);

  return (
    <div className="itemCard__body">
      {props.data.map((item, index) => {
        // console.log(item);
        return (
          // <Card sx={{ maxWidth: 325 }}>
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
          // </Card>
        );
      })}
    </div>
  );
}

export default MessageRestaurantItems;
