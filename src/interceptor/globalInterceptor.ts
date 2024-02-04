import axios from "axios";
import { globalController } from "../environment/config";

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  if (config.method === "post") {
    config.signal = globalController.postQueries.signal;
  }
  return config;
});

axios.interceptors.response.use((config) => {
  if (config.status >= 300) {
    console.log(config.data);
    throw new Error(`${config.statusText}`);
  }
  return config;
});

export default axios;
