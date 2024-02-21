import { PlusOutlined } from "@ant-design/icons";
import StopSelect, { OnChangeStopSelect } from "./StopSelect";
import { useState } from "react";
import "../styles/stop-selector-list-styles.css";

import { useMutation, useQuery } from "react-query";
import { getAllStops } from "../../services/stopService";
import { addStopsInRoute } from "../../services/routeService";
import { useParams } from "react-router-dom";

const StopSelectorList = () => {
  const { data: stops } = useQuery([], () =>
    getAllStops().then((res) => res.data)
  );

  const { id } = useParams();
  const { mutate } = useMutation({ mutationFn: addStopsInRoute });

  const [elements, setElements] = useState(() => Array.from(Array(0).keys()));
  const [stopSelectList, setStopSelectlist] = useState<OnChangeStopSelect[]>(
    []
  );

  const onAdd = () => {
    console.log("element added");
    setElements((prev) => [
      ...prev,
      isNaN(prev[prev.length - 1] + 1) ? 1 : prev[prev.length - 1] + 1,
    ]);
    setElements((elements) => {
      const lastElement = elements[elements.length - 1];
      setStopSelectlist((prev) => [
        ...prev,
        { startHour: "", stopId: 1, id: lastElement },
      ]);
      return elements;
    });
  };

  const onDelete = (element: number) => {
    setElements((prev) => prev.filter((el) => el !== element));
    setStopSelectlist((prev) => prev.filter((el) => el.id !== element));
  };

  const handleSubmit = () => {
    console.log(stopSelectList);
    mutate({
      routeId: Number(id),
      routeStops: stopSelectList.map((stopSelect) => {
        return {
          arriveHour: stopSelect.startHour,
          position: 1,
          stopId: stopSelect.stopId,
        };
      }),
    });
  };

  const handleChangeStopSelect = (data: OnChangeStopSelect) => {
    setStopSelectlist((prev) =>
      prev.map((el) => {
        if (el.id === data.id) {
          return { ...data };
        }
        return el;
      })
    );
  };

  return (
    <div className="stop-list">
      {elements.map((element) => {
        return (
          <StopSelect
            id={element}
            key={element}
            stops={stops || []}
            onClose={() => onDelete(element)}
            onChange={handleChangeStopSelect}
          />
        );
      })}
      <button className="button" type="button" onClick={onAdd}>
        <PlusOutlined />
      </button>
      <button className="button --dark" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
export default StopSelectorList;
