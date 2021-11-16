// importing
const express = require("express");
const dialogflowRoutes = require("./routes/dialogflow.js");
// const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const registerRoute = require("./routes/register.js");
const loginRoute = require("./routes/login.js");

// app config
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// DB config
const connnection_url =
  "mongodb+srv://admin:CmRVRYfQxA4nZjo6@cluster0.yidxc.mongodb.net/chatbotdb?retryWrites=true&w=majority";
mongoose.connect(
  connnection_url,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) throw err;
    console.log("connected to MongoDB");
  }
);

const db = mongoose.connection;
db.on("error", console.log);

// api routes
app.use("/api/dialogflow", dialogflowRoutes);
app.use(registerRoute);
app.use(loginRoute);

// listen
app.listen(port, () => console.log(`Server running at localhost: ${port}`));
