import React from "react";
import "./MessageRestaurants.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { nanoid } from "nanoid";

function MessageRestaurants(props) {
  // console.log(props.data);

  return (
    <div className="messageRestaurants__body">
      {props.data.map((restaurant) => {
        return (
          <Card sx={{ width: 250, marginTop: 2 }} key={nanoid()}>
            <CardMedia
              component="img"
              height="140"
              image={restaurant.structValue.fields.restaurantImgUrl.stringValue}
              alt={restaurant.structValue.fields.restaurantImgAlt.stringValue}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {restaurant.structValue.fields.restaurantName.stringValue}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default MessageRestaurants;
