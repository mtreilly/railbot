import type { NextApiRequest, NextApiResponse } from "next";
import dialogflow from "@google-cloud/dialogflow";
import { processRequest } from "../../services/processRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
      const results = await responses;
      const result = results[0].queryResult;

      if (result) {
        console.log(`  Query: ${result?.queryText}`);
        console.log(`  Response: ${result?.fulfillmentText}`);
        if (result?.intent) {
          console.log(`  Intent: ${result?.intent?.displayName}`);
        } else {
          console.log("  No intent matched.");
        }

        const response = await processRequest(result ?? {});

        return res.status(200).json(response);
      }
    } catch (error) {
      console.log("error: ", error);
      const message = {
        text: "Sorry, I don't know how to answer that",
        isUser: false,
        data: null,
      };

      res.status(200).json(message);
    }
  } catch (error) {
    console.log("error: ", error);
    const message = {
      text: "Issue with Bot, please try again later",
      isUser: false,
      data: null,
    };

    res.status(200).json(message);
  }
};
