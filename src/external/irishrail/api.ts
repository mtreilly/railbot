import {
  NumberMinutesRange,
  StationDataSchema,
  StationFilterSchema,
  StationSchema,
  StationType,
  TrainMovementSchema,
  TrainSchema,
  TrainType,
} from "./models";
import { request, resultToArray } from "./utils";

// DOCS: http://api.irishrail.ie/realtime/

export const irishRailApi = {
  // http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML
  getAllStations: async () => {
    const parsedData = await request("/getAllStationsXML");
    const result: StationSchema[] =
      parsedData["ArrayOfObjStation"]["objStation"];

    return resultToArray(result);
  },

  // http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=D
  getAllStationsWithType: async (params: { StationType: StationType }) => {
    const parsedData = await request(
      "/getAllStationsXML_WithStationType",
      params
    );
    const result: StationSchema[] =
      parsedData["ArrayOfObjStation"]["objStation"];

    return resultToArray(result);
  },

  // http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML
  getCurrentTrains: async () => {
    const parsedData = await request("/getCurrentTrainsXML");
    const result: TrainSchema[] =
      parsedData["ArrayOfObjTrainPositions"]["objTrainPositions"];
    return resultToArray(result);
  },

  // http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML_WithTrainType?TrainType=D
  getCurrentTrainsWithType: async (params: { TrainType: StationType }) => {
    const parsedData = await request(
      "/getCurrentTrainsXML_WithTrainType",
      params
    );
    const result: TrainSchema[] =
      parsedData["ArrayOfObjTrainPositions"]["objTrainPositions"];

    return resultToArray(result);
  },

  // http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=Bayside
  getStationDataByName: async (params: { StationDesc: string }) => {
    const parsedData = await request("/getStationDataByNameXML", params);

    const result: StationDataSchema[] =
      parsedData["ArrayOfObjStationData"]["objStationData"];

    return resultToArray(result);
  },
  // http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML_withNumMins?StationDesc=Bayside&NumMins=20
  getStationDataByNameWithTime: async (params: {
    StationDesc: string;
    NumMins: NumberMinutesRange;
  }) => {
    const parsedData = await request(
      "/getStationDataByNameXML_withNumMins",
      params
    );

    const result: StationDataSchema[] =
      parsedData["ArrayOfObjStationData"]["objStationData"];

    return resultToArray(result);
  },

  // http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=mhide
  getStationDataByCode: async (params: { StationCode: string }) => {
    const parsedData = await request("/getStationDataByCodeXML", params);

    const result: StationDataSchema[] =
      parsedData["ArrayOfObjStationData"]["objStationData"];

    return resultToArray(result);
  },

  // http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=mhide&NumMins=20
  getStationDataByCodeWithTime: async (params: {
    StationCode: string;
    NumMins: NumberMinutesRange;
  }) => {
    const parsedData = await request(
      "/getStationDataByCodeXML_WithNumMins",
      params
    );

    const result: StationDataSchema[] =
      parsedData["ArrayOfObjStationData"]["objStationData"];

    return resultToArray(result);
  },

  // http://api.irishrail.ie/realtime/realtime.asmx/getStationsFilterXML?StationText=br
  getStationsFilter: async (params: { StationText: string }) => {
    const parsedData = await request("/getStationsFilterXML", params);
    const result: StationFilterSchema[] =
      parsedData["ArrayOfObjStationFilter"]["objStationFilter"];

    return resultToArray(result);
  },

  // http://api.irishrail.ie/realtime/realtime.asmx/getTrainMovementsXML?TrainId=e109&TrainDate=21%20dec%202011
  getTrainMovements: async (params: { TrainId: string; TrainDate: Date }) => {
    const trainDate = params.TrainDate;
    const shorthandMonthName = trainDate.toLocaleString("default", {
      month: "short",
    });
    const newTrainDate = `${trainDate.getDay()} ${shorthandMonthName} ${trainDate.getFullYear()}`;

    const processedParams = { ...params, TrainDate: newTrainDate };
    const parsedData = await request("/getTrainMovementsXML", processedParams);

    return parsedData;
    const result: TrainMovementSchema[] =
      parsedData["ArrayOfObjTrainMovements"]["objTrainMovements"];

    return resultToArray(result);
  },
};
