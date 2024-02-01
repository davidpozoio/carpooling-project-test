import { useRef } from "react";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

interface OptionValues {
  name: string;
  onClick: () => void;
}

interface OptionsProps {
  onClose: () => void;
  show: boolean;
  values: OptionValues[];
}

const Options = ({ onClose, show = true, values }: OptionsProps) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, () => {
    if (show) onClose();
  });
  if (!show) return;

  return (
    <div ref={ref}>
      {values.map((option, index) => {
        return (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              option.onClick();
              onClose();
            }}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
};
export default Options;
