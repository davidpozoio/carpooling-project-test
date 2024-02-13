import Form from "./components/Form";
import Input from "./components/Input";
import ROUTES from "../../consts/routes";
import { login } from "../../services/authService";
import { ErrorAuthResponse, LoginDto } from "../../models/authModel";
import useAutomaticLogin from "../../hooks/useAutomaticLogin";
import { useState } from "react";
import { ErrorMessage } from "../../models/formModel";
import ERROR_CODES from "../../consts/errorCode";
import { useQueryClient } from "react-query";
import { useAppStore } from "../../store/store";
import BlockLink from "../../components/BlockLink";

const Login = () => {
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const queryClient = useQueryClient();
  const setBlokcLinks = useAppStore((state) => state.setBlockLinks);

  const { mutate, isLoading } = useAutomaticLogin<LoginDto>({
    fetchFn: (data) => login(data),
    redirectWhenSuccess: ROUTES.NOTES.ME,
    onError: (error) => {
      console.log(error);

      const data = error as {
        code: string;
        response: { data: ErrorAuthResponse; status: number };
      };

      const codeError = data.response.data.code;
      if (codeError === ERROR_CODES.E2000.CODE) {
        setErrors((prev) => [
          ...prev,
          { inputName: "username", message: "username is incorrect" },
        ]);
      }
      if (codeError === ERROR_CODES.E2001.CODE) {
        setErrors((prev) => [
          ...prev,
          { inputName: "password", message: "password is incorrect" },
        ]);
      }
    },
    onSettled: () => {
      setBlokcLinks(false);
      queryClient.clear();
    },
  });

  return (
    <>
      <h2>Log in</h2>
      <Form
        fields={{ username: "", password: "" }}
        onSubmit={(data) => {
          setBlokcLinks(true);
          mutate({ username: data["username"], password: data["password"] });
        }}
        errors={errors}
      >
        <Input
          label="Username: "
          name="username"
          placeholder="put an username"
          errors={{
            required: { value: true, message: "username is required*" },
          }}
        />
        <Input
          label="Password: "
          name="password"
          type="password"
          placeholder="********"
          errors={{
            required: { value: true, message: "password is required*" },
          }}
        />

        <button type="submit" disabled={isLoading}>
          Log in!
        </button>
        <BlockLink to={ROUTES.AUTH.SIGNUP}>sign up</BlockLink>
      </Form>
    </>
  );
};

export default Login;
