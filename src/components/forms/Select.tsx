import { useContext } from "react";
import { FieldValues } from "react-hook-form";
import { FormContext } from "./Form";
import "../styles/input-styles.css";

export interface OptionField {
  value: string;
  text: string;
}

interface SelectProps {
  label: string;
  name: keyof FieldValues;
  options: OptionField[];
  placeholder: string;
  onChange?: (value: string) => void;
}

const Select = ({
  label,
  name,
  placeholder,
  options,
  onChange,
}: SelectProps) => {
  const { register } = useContext(FormContext);

  const fields = register && {
    ...register(name),
  };

  return (
    <div className="input-container">
      <label htmlFor={`I${name}`} className="label">
        {label}
      </label>
      <select
        id={`I${name}`}
        defaultValue={placeholder}
        {...fields}
        className="input"
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
          fields?.onChange(e);
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
