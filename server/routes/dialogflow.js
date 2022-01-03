const express = require("express");
const dialogflow = require("dialogflow");
const config = require("../config/keys");
const router = express.Router();

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
const sessionClient = new dialogflow.SessionsClient();

router.post("/textQuery", async (req, res) => {
  const userId = req.body.userInfo.id;
  let sessionPath = sessionClient.sessionPath(projectId, sessionId + userId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.text,
        languageCode: languageCode,
      },
    },
  };

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
  res.send(result);
});

router.post("/eventQuery", async (req, res) => {
  const userId = req.body.userInfo.id;
  let sessionPath = sessionClient.sessionPath(projectId, sessionId + userId);

  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: req.body.event,
        languageCode: languageCode,
      },
    },
  };

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
  res.send(result);
});

module.exports = router;
