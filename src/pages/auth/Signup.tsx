import Form from "./components/Form";
import Input from "./components/Input";
import ROUTES from "../../consts/routes";
import { signup } from "../../services/authService";
import useAutomaticLogin from "../../hooks/useAutomaticLogin";
import { ErrorAuthResponse, LoginDto } from "../../models/authModel";
import { useState } from "react";
import { ErrorMessage } from "../../models/formModel";
import ERROR_CODES from "../../consts/errorCode";
import useHttpError from "../../hooks/useHttpError";
import { useQueryClient } from "react-query";
import BlockLink from "../../components/BlockLink";
import { useAppStore } from "../../store/store";
import "./styles/pages-styles.css";
import useTitle from "../../hooks/useTitle";

const Signup = () => {
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const { errorMessage, setError } = useHttpError();
  const queryClient = useQueryClient();
  const setBlockLinks = useAppStore((state) => state.setBlockLinks);
  const isAuthenticating = useAppStore((state) => state.isAuthenticating);

  useTitle("signup");

  const { mutate, isLoading } = useAutomaticLogin<LoginDto>({
    fetchFn: (data) => signup(data),
    redirectWhenSuccess: ROUTES.NOTES.ME,
    onError: (error) => {
      const response = error as {
        code: string;
        response: { data: ErrorAuthResponse; status: number };
      };
      setError(response);
      const codeError = response.response.data.code;
      if (codeError === ERROR_CODES.E2002.CODE) {
        setErrors((prev) => [
          ...prev,
          {
            inputName: "username",
            message: "the username has already been taken",
          },
        ]);
      }
    },
    onSettled: () => {
      setBlockLinks(false);
      queryClient.clear();
    },
  });

  return (
    <div className="container content-grid">
      <img className="wave first" src="/public/wave-2.svg" alt="wave figure" />
      <img className="wave second" src="/public/wave-3.svg" alt="wave figure" />
      <Form
        className="form-container center-content"
        fields={{ username: "", password: "", confirmPassword: "" }}
        onSubmit={(data) => {
          setBlockLinks(true);
          mutate({ username: data["username"], password: data["password"] });
        }}
        errors={errors}
      >
        <h2 className="gradient-title --medium-title">Sign up</h2>
        <Input
          label="Username:"
          placeholder="put an username"
          name="username"
          errors={{
            required: { value: true, message: "username is required*" },
          }}
        />

        <Input
          label="Password: "
          name="password"
          placeholder="********"
          type="password"
          errors={{
            required: { value: true, message: "password is required*" },
            minLength: {
              value: 8,
              message: "password must have min 8 digits*",
            },
          }}
        />

        <Input
          label="Confirm password:"
          placeholder="******"
          name="confirmPassword"
          type="password"
          errors={{
            required: { value: true, message: "password is required*" },
          }}
          confirmPassword={true}
        />
        <span>{errorMessage}</span>
        <button
          type="submit"
          disabled={isLoading || isAuthenticating}
          className="button --dark --full-extension"
        >
          Sign up!
        </button>
        <BlockLink className="button --full-extension" to={ROUTES.AUTH.LOGIN}>
          Log in
        </BlockLink>
      </Form>
    </div>
  );
};
export default Signup;
