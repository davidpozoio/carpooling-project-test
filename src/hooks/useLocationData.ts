import { useLocation } from "react-router-dom";

const useLocationData = <T>(dataName: string, defaultData: T) => {
  const { state, pathname } = useLocation();
  return {
    data: (state?.[dataName] as T) || defaultData,
    pathname,
  };
};

export default useLocationData;
