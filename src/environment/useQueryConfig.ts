import { useState } from "react";
import { QueryClient } from "react-query";
import { useAppStore } from "../store/store";

type ErrorAxios = { response: { status: number } };

const useQueryConfig = () => {
  const setAuth = useAppStore((state) => state.setAuth);

  const handleError = (error: unknown) => {
    const errorAxios = error as ErrorAxios;
    if (errorAxios?.response?.status === 401) {
      setAuth(false);
    }
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: handleError,
            retry: 0,
          },
          queries: {
            onError: handleError,
            retry: 0,
          },
        },
      })
  );

  return { queryClient };
};

export default useQueryConfig;
