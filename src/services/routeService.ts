import { environment } from "../environment/config";
import axios from "../interceptor/globalInterceptor";
import {
  RouteAddStopsRequest,
  RouteGetResponse,
  RoutePostRequest,
  RoutePostResponse,
} from "../models/routeMode";

export function getRoutes(areMyRoutes: boolean = false) {
  return axios.get<RouteGetResponse[]>(
    `${environment.HOST_BACK}/route${!areMyRoutes ? "/userRoutes" : ""}`
  );
}

export function getRouteById(id: number) {
  return axios.get<RouteGetResponse>(`${environment.HOST_BACK}/route/${id}`);
}

export function createRoute(route: RoutePostRequest) {
  return axios.post<RoutePostResponse>(`${environment.HOST_BACK}/route`, route);
}

export function deleteRouteById(id: number) {
  return axios.delete(`${environment.HOST_BACK}/route/${id}`);
}

export function addStopsInRoute(routeAddStops: RouteAddStopsRequest) {
  return axios.post(
    `${environment.HOST_BACK}/route/addRouteStops`,
    routeAddStops
  );
}
