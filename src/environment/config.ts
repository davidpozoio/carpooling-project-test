import { QueryClient } from "react-query";

export const config = {
  MODE: import.meta.env.VITE_MODE,
};

export const environment = {
  HOST_BACK:
    config.MODE === "prod"
      ? import.meta.env.VITE_HOST_PROD
      : import.meta.env.VITE_HOST_DEV,
};

export const client = new QueryClient();
