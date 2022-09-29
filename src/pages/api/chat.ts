import type { NextApiRequest, NextApiResponse } from "next";
import dialogflow from "@google-cloud/dialogflow";
import { processRequest } from "../../services/processRequest";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./src/services/dialogFlowService.json",
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    "railbot-agli",
    "fa90rnguanwegoiaueva"
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  const responses = sessionClient.detectIntent(request);

  try {
    responses.then((data) => {
      const result = data[0].queryResult;
      if (result) {
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log("  No intent matched.");
        }
        processRequest(result).then((response) => {
          res.status(200).json(response);
        });
      }
    });
  } catch {
    const message = {
      text: "Issue with Bot, please try again later",
      isUser: false,
      data: null,
    };

    res.status(200).json(message);
  }
}
