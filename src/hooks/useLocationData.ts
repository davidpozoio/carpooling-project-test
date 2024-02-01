import { useState } from "react";
import { useLocation } from "react-router-dom";

const useLocationData = <T>(dataName: string, defaultData: T) => {
  const { state, pathname } = useLocation();
  const [data] = useState(() => (state?.[dataName] as T) || defaultData);
  return {
    data,
    pathname,
    isDataPassed: !!state?.[dataName],
  };
};

export default useLocationData;
