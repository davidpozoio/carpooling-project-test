import { useState } from "react";
import { RouteStop } from "../../models/routeStopModel";

const useRouteStopsFields = () => {
  const [routeStops, setRouteStops] = useState<RouteStop[]>([]);

  return { routeStops, setRouteStops };
};

export default useRouteStopsFields;
