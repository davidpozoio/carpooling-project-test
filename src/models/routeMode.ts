export interface RouteContent {
  name: string;
  startDate: number;
  description: string;
}

export interface RouteGetResponse extends RouteContent {
  id: number;
}

export interface RoutePostRequest extends RouteContent {}
