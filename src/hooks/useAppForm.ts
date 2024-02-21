import { useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FormContext } from "../components/forms/Form";

const useAppForm = <T extends FieldValues>(
  submit: (data: T, routeStops?: unknown) => void
) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<T>({ mode: "all" });

  const { routeStops } = useContext(FormContext);

  const onSubmit = handleSubmit((data) => submit(data, routeStops));

  return { register, onSubmit, errors, watch, setError, clearErrors };
};

export default useAppForm;
