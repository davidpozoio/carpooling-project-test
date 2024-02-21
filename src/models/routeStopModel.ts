import { StopGetResponse } from "./stopMode";

export interface RouteStopContent {
  position: number;
  arriveHour: string;
  stopId: number;
}

export interface RouteStop extends RouteStopContent {
  id: number;
  stop: StopGetResponse;
}
