import { ReactNode, createContext } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import useAppForm from "../../../hooks/useAppForm";

interface FormProps {
  fields: { [key: string]: unknown };
  children: ReactNode;
}

interface FormContextValues {
  register?: UseFormRegister<FieldValues>;
  onSubmit?: () => void;
  errors?: FieldErrors<FieldValues>;
  fields?: { [key: string]: unknown };
}

export const FormContext = createContext<FormContextValues>({});

const Form = ({ fields, children }: FormProps) => {
  const formState = useAppForm<typeof fields>();
  return (
    <FormContext.Provider value={{ ...formState, fields }}>
      <form onSubmit={formState.onSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

export default Form;
