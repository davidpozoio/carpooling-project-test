import { PlusOutlined } from "@ant-design/icons";
import StopSelect from "./StopSelect";
import { useContext, useState } from "react";
import "../styles/stop-selector-list-styles.css";
import Form, { FormContext } from "./Form";
import { useQuery } from "react-query";
import { getAllStops } from "../../services/stopService";

const StopSelectorList = () => {
  const { data: stops } = useQuery([], () =>
    getAllStops().then((res) => res.data)
  );

  const { routeStops, setRouteStops } = useContext(FormContext);

  const [elements, setElements] = useState(() => Array.from(Array(0).keys()));

  const onAdd = () => {
    setElements((prev) => [
      ...prev,
      isNaN(prev[prev.length - 1] + 1) ? 1 : prev[prev.length - 1] + 1,
    ]);

    if (setRouteStops)
      setRouteStops((prev) => [
        ...prev,
        { id: 1, arriveHour: "", position: 1, stopId: 1 },
      ]);
  };

  const onDelete = (element: number) => {
    setElements((prev) => prev.filter((el) => el !== element));
  };

  const handleSubmit = (data: unknown) => {
    console.log(data);

    console.log(routeStops);
    if (setRouteStops) setRouteStops((prev) => [...prev]);
  };

  return (
    <Form fields={{ name: "" }} onSubmit={handleSubmit} className="stop-list">
      {elements.map((element) => {
        return (
          <StopSelect
            id={element}
            key={element}
            stops={stops || []}
            onClose={() => onDelete(element)}
          />
        );
      })}
      <button className="button" type="button" onClick={onAdd}>
        <PlusOutlined />
      </button>
      <button className="button --dark">Submit</button>
    </Form>
  );
};
export default StopSelectorList;
