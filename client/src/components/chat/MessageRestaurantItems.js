import React, { useContext } from "react";
import "./MessageRestaurantItems.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UserContext } from "../loginAndRegister/UserContext";

function MessageRestaurantItems(props) {
  // console.log(props.data);

  const { /*isAuth, setIsAuth, login, setLogin,*/ userInfo } =
    useContext(UserContext);

  const addItemToCart = (itemName) => {
    //na razie nie rozwijam dalej
    //bo nie wiem czy wgl taki przycisk dawac
    console.log("Dodanie do karty " + itemName);
    console.log(userInfo);
  };

  return (
    <div className="itemCard__body">
      {/* {props.data.map((item) => {
        return (
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.structValue.fields.restaurantName.stringValue}
              </Typography>
            </CardContent>
          </Card>
        );
      })} */}
      <Card sx={{ maxWidth: 325 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Tytul
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            25.50 PLN
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            onClick={() => {
              addItemToCart("Chicken Lover");
            }}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default MessageRestaurantItems;