import { RouteStop, RouteStopContent } from "./routeStopModel";

export interface RouteContent {
  name: string;
  startDate: string;
  description: string;
}

export interface RouteGetResponse extends RouteContent {
  id: number;
  routeStop: RouteStop[];
}

export interface RoutePostRequest extends RouteContent {}

export interface RoutePostResponse extends RouteContent {
  id: number;
}

export interface RouteAddStopsRequest {
  routeId: number;
  routeStops: RouteStopContent[];
}
