const express = require("express");
const dialogflow = require("dialogflow");
// const uuid = require("uuid");
const config = require("../config/keys");
// const structjson = require("./structjson.js");

const router = express.Router();

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

// Create new session
const sessionClient = new dialogflow.SessionsClient();
// const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Text Query Route
router.post("/textQuery", async (req, res) => {
  //proboje sobie stworzyc unikalna sesje dla kazdego usera
  const userId = req.body.userInfo.id;
  let sessionPath = sessionClient.sessionPath(projectId, sessionId + userId);

  //We need to send some information that comes from the client to Dialogflow API
  // The text query request.

  console.log("sessionPath: {} " + sessionPath);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // req.body.text to bodyparser - przechwytuje cialo http requesta (body w postmanie)
        //   text: req.body.text,
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request); //tutaj jest nasz response od api dialogflow
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`Intent: ${result.intent.displayName}`);
  } else {
    console.log(`No intent matched.`);
  }
  //wysylanie responsa do frontendu
  res.send(result);
  console.log(result);
});

router.post("/eventQuery", async (req, res) => {
  //proboje sobie stworzyc unikalna sesje dla kazdego usera
  const userId = req.body.userInfo.id;
  let sessionPath = sessionClient.sessionPath(projectId, sessionId + userId);

  // The event query request.
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: req.body.event,
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`Intent: ${result.intent.displayName}`);
  } else {
    console.log(`No intent matched.`);
  }
  //wysylanie responsa do frontendu
  res.send(result);
});

module.exports = router;
