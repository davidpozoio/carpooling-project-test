import { useContext } from "react";
import { FormContext } from "./Form";
import { FieldValues, RegisterOptions } from "react-hook-form";

interface InputProps {
  label: string;
  name: keyof FieldValues;
  errors: RegisterOptions<FieldValues>;
  placeholder: string;
}

const Input = ({ label, name, errors, placeholder }: InputProps) => {
  const { register, errors: errorsState } = useContext(FormContext);
  const fields = register ? { ...register(name, errors) } : {};
  return (
    <>
      <label htmlFor={`I${name}`}>{label}</label>
      <input id={`I${name}`} placeholder={placeholder} {...fields} />
      {errorsState
        ? errorsState[name] && <span>{`${errorsState[name]?.message}`}</span>
        : {}}
    </>
  );
};
export default Input;
