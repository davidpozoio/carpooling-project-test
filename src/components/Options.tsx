import { useRef } from "react";
import useOutsideAlerter from "../hooks/useOutsideAlerter";
import "./styles/options-styles.css";

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
    <div ref={ref} className="option-container opacity-transition">
      {values.map((option, index) => {
        return (
          <button
            className="option-item"
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
