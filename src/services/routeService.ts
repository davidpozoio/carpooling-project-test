import { environment } from "../environment/config";
import axios from "../interceptor/globalInterceptor";
import { RouteGetResponse, RoutePostRequest } from "../models/routeMode";

export function getRoutes(areMyRoutes: boolean = false) {
  return axios.get<RouteGetResponse[]>(
    `${environment.HOST_BACK}/route${areMyRoutes ? "/userRoutes" : ""}`
  );
}

export function createRoute(route: RoutePostRequest) {
  return axios.post(`${environment.HOST_BACK}/route`, route);
}
