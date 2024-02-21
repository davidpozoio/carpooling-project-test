import { Dispatch, ReactNode, createContext, useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import useAppForm from "../../hooks/useAppForm";
import { ErrorMessage } from "../../models/formModel";
import "../styles/form-styles.css";
import { RouteStop } from "../../models/routeStopModel";
import useRouteStopsFields from "../hooks/useStopFields";

interface FormProps {
  fields: Record<string, string>;
  children: ReactNode;
  onSubmit: (data: FormProps["fields"], routeStops?: unknown) => void;
  errors?: ErrorMessage[];
  className?: string;
}

interface FormContextValues {
  register?: UseFormRegister<FieldValues>;
  onSubmit?: () => void;
  errors?: FieldErrors<FieldValues>;
  fields?: { [key: string]: unknown };
  watch?: UseFormWatch<FieldValues>;
  routeStops?: RouteStop[];
  setRouteStops?: Dispatch<React.SetStateAction<RouteStop[]>>;
}

export const FormContext = createContext<FormContextValues>({});

const Form = ({ fields, children, onSubmit, errors, className }: FormProps) => {
  const { routeStops, setRouteStops } = useRouteStopsFields();
  const formState = useAppForm<typeof fields>(onSubmit);
  const [prevErrors, setPrevErrors] = useState<ErrorMessage[]>([]);

  useEffect(() => {
    if (!errors || errors.length === 0) return;
    if (errors !== prevErrors)
      errors.forEach((error) => {
        formState.setError(
          error.inputName,
          {
            message: error.message,
          },
          { shouldFocus: true }
        );
      });
    setPrevErrors(errors);
  }, [errors, formState, prevErrors]);

  return (
    <FormContext.Provider
      value={{ ...formState, fields, routeStops, setRouteStops }}
    >
      <form className={"form " + className} onSubmit={formState.onSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
