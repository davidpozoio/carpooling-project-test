import { DriverPostRequest } from "../models/driverMode";
import axios from "../interceptor/globalInterceptor";
import { environment } from "../environment/config";

export function createDriverDetails(driver: DriverPostRequest) {
  return axios.post(`${environment.HOST_BACK}/driver/createDriver`, driver);
}
