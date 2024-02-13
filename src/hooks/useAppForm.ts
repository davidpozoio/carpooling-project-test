import { FieldValues, useForm } from "react-hook-form";

const useAppForm = <T extends FieldValues>(submit: (data: T) => void) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<T>({ mode: "all" });
  const onSubmit = handleSubmit(submit);

  return { register, onSubmit, errors, watch, setError, clearErrors };
};

export default useAppForm;
