import type { NextApiRequest, NextApiResponse } from "next";
import dialogflow from "@google-cloud/dialogflow";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    throw { status: 401, message: "Missing Authorization Header" };
  }

  // console.log(req.body);
  // console.log("---------------------");
  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(" ")[1] ?? "";
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  if (username !== "admin" || password !== "admin") {
    throw { status: 401, message: "Invalid Authentication Credentials" };
  }

  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "../../services/dialogFlowService.json",
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
        text: "hello",
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  const response = {
    fulfillmentMessages: [
      {
        text: {
          text: ["Text response from webhook"],
        },
      },
    ],
  };

  res.status(200).json(response);
}
