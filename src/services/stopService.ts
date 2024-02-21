import { environment } from "../environment/config";
import axios from "../interceptor/globalInterceptor";
import { StopGetResponse } from "../models/stopMode";

export function getAllStops() {
  return axios.get<StopGetResponse[]>(`${environment.HOST_BACK}/stops`);
}
