import { useEffect, useState } from "react";
import { StopGetResponse } from "../../models/stopMode";
import Input from "./Input";
import Select, { OptionField } from "./Select";
import "../styles/stop-select-styles.css";
import { CloseOutlined } from "@ant-design/icons";

export interface OnChangeStopSelect {
  id: number;
  stopId: number;
  startHour: string;
}

interface StopSelectProps {
  id: number;
  stops: StopGetResponse[];
  onClose?: () => void;
  onChange?: (data: OnChangeStopSelect) => void;
}

const StopSelect = ({ stops, onClose, onChange, id }: StopSelectProps) => {
  const [stopsOptions] = useState<OptionField[]>(
    stops.map((stop) => {
      return { value: stop.id.toString(), text: stop.name };
    })
  );
  const [stopSelect, setStopSelect] = useState<OnChangeStopSelect>({
    stopId: 1,
    startHour: "",
    id,
  });

  useEffect(() => {
    if (onChange) onChange(stopSelect);
  }, [stopSelect]);

  const onChangeSelect = (stop: string) => {
    setStopSelect((prev) => ({ ...prev, stopId: Number(stop) }));
  };
  const onChangeDate = (date: string) => {
    setStopSelect((prev) => ({ ...prev, startHour: date }));
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
        type="date"
        name="arriveHour"
        placeholder="arrive hour"
        onChange={onChangeDate}
        errors={{}}
      />
    </div>
  );
};
export default StopSelect;
