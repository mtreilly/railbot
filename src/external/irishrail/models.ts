// A for All, M for Mainline, S for suburban and D for DART) any other value will be changed to A
export type StationType = "A" | "M" | "S" | "D";

// N for not yet running or R for running
export type TrainStatusSchema = "N" | "R";

// O= Origin, S= Stop, T= TimingPoint (non stopping location) D = Destination
export type StopTypeSchema = "C" | "N" | "-";

// O = Origin, D = Destination, S= Stop
export type LocationTypeMovementSchema = "O" | "S" | "T" | "D";
export type LocationTypeStationSchema = "O" | "S" | "D";
export type TrainType = "DART" | "INTERCITY" | "TRAIN";

// Not a crazy person didn't write out all that,
// Used this to generate the union
// let range = (max) => Array.from(Array(max).keys()).join( "|" );
export type NumberMinutesRange =
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90;

export type StationSchema = {
  StationDesc: string;
  StationAlias: string;
  StationLatitude: string;
  StationLongitude: string;
  StationCode: string;
  StationId: string;
};

export type StationFilterSchema = {
  Stationcode: string;
  Stationdesc: string;
  Stationdesc_sp: string;
};

export type TrainSchema = {
  Trainstatus: TrainStatusSchema;
  Trainlatitude: string;
  Trainlongitude: string;
  Traincode: string;
  Traindate: string;
  Publicmessage: string;
  // Direction is either Northbound or Southbound for trains between Dundalk and Rosslare and between Sligo and Dublin.
  // For all other trains the direction is to the destination eg. To Limerick
  Direction: string;
};

export type TrainMovementSchema = {
  Traincode: string;
  Traindate: string;
  Locationcode: string;
  Locationfullname: string;
  Locationorder: string;
  Locationtype: LocationTypeMovementSchema;
  Trainorigin: string;
  Traindestination: string;
  Scheduledarrival: string;
  Scheduleddeparture: string;
  Expectedarrival: string;
  Expecteddeparture: string;
  Arrival: string;
  Departure: string;
  Autharrival: string;
  Authdeparture: string;
  Stoptype: StopTypeSchema;
};

export type StationDataSchema = {
  Servertime: string;
  Traincode: string;
  Stationfullname: string;
  Stationcode: string;
  Querytime: string;
  Traindate: string;
  Origin: string;
  Destination: string;
  Origintime: string;
  Destinationtime: string;
  Status: string;
  Lastlocation: string;
  Duein: string;
  Late: string;
  Exparrival: string;
  Expdeparture: string;
  Scharrival: string;
  Schdeparture: string;
  Direction: string;
  Traintype: TrainType;
  Locationtype: LocationTypeStationSchema;
};
