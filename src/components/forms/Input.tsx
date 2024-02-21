import { HTMLInputTypeAttribute, useContext } from "react";
import { FormContext } from "./Form";
import { FieldValues, RegisterOptions } from "react-hook-form";
import "../styles/input-styles.css";

interface InputProps {
  label: string;
  name: keyof FieldValues;
  errors: RegisterOptions<FieldValues>;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  confirmPassword?: boolean;
  onChange?: (value: string) => void;
}

const Input = ({
  label,
  name,
  errors,
  placeholder,
  type = "",
  confirmPassword = false,
  onChange,
}: InputProps) => {
  const { register, errors: errorsState, watch } = useContext(FormContext);

  const fields = register && {
    ...register(
      name,
      (!confirmPassword && errors) || {
        validate: (value: string) => {
          if (watch && watch("password") != value) {
            return "passwords don't match";
          }
        },
      }
    ),
  };

  return (
    <div className="input-container">
      <label htmlFor={`I${name}`} className="label">
        {label}
      </label>
      <input
        id={`I${name}`}
        type={type}
        placeholder={placeholder}
        {...fields}
        className="input"
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
          fields?.onChange(e);
        }}
      />
      {errorsState
        ? errorsState[name] && (
            <span className="error-message">{`${errorsState[name]?.message}`}</span>
          )
        : ""}
    </div>
  );
};
export default Input;
