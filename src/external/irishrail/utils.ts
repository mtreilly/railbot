import { XMLParser } from "fast-xml-parser";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const ROOT_URL = publicRuntimeConfig.rootURL;

const parseRequest = async (response: Response) => {
  const responseText = await response.text();
  const parser = new XMLParser();
  return parser.parse(responseText);
};
export const request = async (endpoint: string, params = {}) => {
  const processedParams = new URLSearchParams(params);
  let processedParamsString = "";
  if (processedParams.toString().length > 0) {
    processedParamsString += "?" + processedParams.toString();
  }
  const url = `${ROOT_URL}/api${endpoint}` + processedParamsString;
  console.log("requesting", url);
  const response = await fetch(url);
  console.log("got response ");
  return parseRequest(response);
};

export const resultToArray = <T>(result: T[]) => {
  if (Array.isArray(result)) {
    return result;
  } else {
    const emptyResult: T[] = [];
    return emptyResult;
  }
};
