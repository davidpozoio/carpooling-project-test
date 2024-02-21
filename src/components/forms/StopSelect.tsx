import { useContext, useState } from "react";
import { StopGetResponse } from "../../models/stopMode";
import Input from "./Input";
import Select, { OptionField } from "./Select";
import "../styles/stop-select-styles.css";
import { CloseOutlined } from "@ant-design/icons";
import { FormContext } from "./Form";

interface OnChangeStopSelect {
  stopId: number;
  startHour: string;
}

interface StopSelectProps {
  id: number;
  stops: StopGetResponse[];
  onClose?: () => void;
  onChange?: (data: OnChangeStopSelect) => void;
}

const StopSelect = ({ stops, onClose, id }: StopSelectProps) => {
  const [stopsOptions] = useState<OptionField[]>(
    stops.map((stop) => {
      return { value: stop.id.toString(), text: stop.name };
    })
  );

  const { setRouteStops } = useContext(FormContext);

  const onChangeSelect = (stop: string) => {
    if (setRouteStops)
      setRouteStops((prev) =>
        prev.map((el) => {
          if (el.id === id) {
            return { ...el, stopId: Number(stop) };
          }
          return el;
        })
      );
  };
  const onChangeDate = (date: string) => {
    if (setRouteStops)
      setRouteStops((prev) =>
        prev.map((el) => {
          if (el.id === id) {
            return { ...el, arriveHour: date };
          }
          return el;
        })
      );
  };

  return (
    <div className="stop-card">
      <header className="stop-card-header">
        <button
          className="button --circle --dark"
          onClick={() => {
            if (onClose) onClose();
          }}
        >
          <CloseOutlined />
        </button>
      </header>

      <Select
        label="Stop:"
        name="stopId"
        placeholder=""
        onChange={onChangeSelect}
        options={stopsOptions}
      />
      <Input
        label="Arrive hour:"
        type="time"
        name="arriveHour"
        placeholder="arrive hour"
        onChange={onChangeDate}
        errors={{}}
      />
    </div>
  );
};
export default StopSelect;
