import { FieldValues, useForm } from "react-hook-form";

const useAppForm = <T extends FieldValues>(submit: (data: T) => void) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<T>({ mode: "all" });
  const onSubmit = handleSubmit(submit);

  return { register, onSubmit, errors, watch };
};

export default useAppForm;
