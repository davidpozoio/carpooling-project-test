import { ReactNode, createContext } from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import useAppForm from "../../../hooks/useAppForm";

interface FormProps {
  fields: Record<string, string>;
  children: ReactNode;
  onSubmit: (data: FormProps["fields"]) => void;
}

interface FormContextValues {
  register?: UseFormRegister<FieldValues>;
  onSubmit?: () => void;
  errors?: FieldErrors<FieldValues>;
  fields?: { [key: string]: unknown };
  watch?: UseFormWatch<FieldValues>;
}

export const FormContext = createContext<FormContextValues>({});

const Form = ({ fields, children, onSubmit }: FormProps) => {
  const formState = useAppForm<typeof fields>(onSubmit);
  return (
    <FormContext.Provider value={{ ...formState, fields }}>
      <form onSubmit={formState.onSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

export default Form;
