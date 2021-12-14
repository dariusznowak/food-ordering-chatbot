import React from "react";
import "./MessageRestaurants.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function MessageRestaurants(props) {
  // console.log(props.data);

  return (
    <div className="messageRestaurants__body">
      {props.data.map((restaurant) => {
        return (
          <Card sx={{ maxWidth: 345 }}>
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
