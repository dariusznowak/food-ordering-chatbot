// importing
const express = require("express");
const dialogflowRoutes = require("./routes/dialogflow.js");
const bodyParser = require("body-parser");
const cors = require("cors");

// app config
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/dialogflow", dialogflowRoutes);
// DB config

// api routes

// listen
app.listen(port, () => console.log(`Server running at localhost: ${port}`));
