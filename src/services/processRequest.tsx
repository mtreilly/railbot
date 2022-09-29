import { google } from "@google-cloud/dialogflow/build/protos/protos";
import IQueryResult = google.cloud.dialogflow.v2.IQueryResult;
import { irishRailApi } from "../external/irishrail/api";

export const processRequest = async (response: IQueryResult) => {
  let text = response.fulfillmentText
    ? response.fulfillmentText
    : "Sorry, I don't know how to answer that";

  const data = null;

  switch (response.intent?.name) {
    case "projects/railbot-agli/agent/intents/e9d405e4-31f3-49e7-8a4c-a07772fa699d": {
      const result = await irishRailApi.getAllStationsWithType({
        StationType: "D",
      });
      text = `There are ${result.length} dart stations, listed in alphabetical order with code and name: `;
      const stationList = result.map((station) => {
        return `${station.StationDesc}-${station.StationCode}`;
      });
      text += stationList.join(", ");
      break;
    }
    case "projects/railbot-agli/agent/intents/eb4f55bd-526a-4b1f-9179-4d11c6642df2": {
      const result = await irishRailApi.getAllStations();
      text = `There are ${result.length} stations, listed in alphabetical order with code and name: `;
      console.log(result);
      const stationList = result.map((station) => {
        return `${station.StationDesc}-${station.StationCode}`;
      });
      text += stationList.join(", ");
      break;
    }
    case "projects/railbot-agli/agent/intents/4e08f298-fd49-4c33-ba16-b28f9949d30e": {
      const result = await irishRailApi.getCurrentTrains();
      text = `There is currently ${result.length} trains running, please about a station to get more information are request a list of stations`;
      break;
    }
    case "projects/railbot-agli/agent/intents/e40c5cca-fc42-45a1-bfa6-8fef77d74e12": {
      const StationDesc = response.parameters?.fields?.Station?.stringValue;

      if (StationDesc) {
        const result = await irishRailApi.getStationDataByName({
          StationDesc: StationDesc,
        });
        text = `The trains running from ${StationDesc}`;
        if (result.length > 0) {
          text = `The trains running from station ${StationDesc} :`;

          const stations = result.slice(0, 3).map((train) => {
            return `: ${train.Traincode}, ${train.Destination} direction ${train.Direction} at ${train.Duein} minutes`;
          });
          text += stations.join("");
        } else {
          text = `No trains running from station code ${StationDesc}`;
        }
      }
      break;
    }
    case "projects/railbot-agli/agent/intents/6fb4bccd-97ef-47c9-b5cb-d9c84d62df5b": {
      const StationCode = response.parameters?.fields?.StationCode?.stringValue;

      if (StationCode) {
        const result = await irishRailApi.getStationDataByCode({
          StationCode: StationCode,
        });
        if (result.length > 0) {
          text = `The trains running from station code ${StationCode} from station ${result[0]?.Stationfullname} :`;

          const stations = result.slice(0, 3).map((train) => {
            return `: ${train.Traincode}, ${train.Destination} direction ${train.Direction} at ${train.Duein} minutes`;
          });
          text += stations.join("");
        } else {
          text = `No trains running from station code ${StationCode}`;
        }
      }
      break;
    }
    default: {
      break;
    }
  }
  return {
    text: text,
    isUser: false,
    data: data,
  };
};
