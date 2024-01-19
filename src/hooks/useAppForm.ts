import { FieldValues, useForm } from "react-hook-form";

const useAppForm = <T extends FieldValues>() => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<T>({ mode: "all" });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return { register, onSubmit, errors };
};

export default useAppForm;
