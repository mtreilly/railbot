import { XMLParser } from "fast-xml-parser";

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
  const response = await fetch(`/api${endpoint}` + processedParamsString);

  return parseRequest(response);
};

export const resultToArray = (result: any) => {
  if (Array.isArray(result)) {
    return result;
  } else {
    return [];
  }
};
