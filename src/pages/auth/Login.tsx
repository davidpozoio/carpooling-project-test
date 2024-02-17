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
import "./styles/pages-styles.css";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const queryClient = useQueryClient();
  const setBlokcLinks = useAppStore((state) => state.setBlockLinks);
  const isAuthenticating = useAppStore((state) => state.isAuthenticating);

  useTitle("login");

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
    <div className="container content-grid">
      <img
        className="wave first"
        src="/src/assets/wave-2.svg"
        alt="wave figure"
      />
      <img
        className="wave second"
        src="/src/assets/wave-3.svg"
        alt="wave figure"
      />
      <Form
        className="form-container center-content"
        fields={{ username: "", password: "" }}
        onSubmit={(data) => {
          setBlokcLinks(true);
          mutate({ username: data["username"], password: data["password"] });
        }}
        errors={errors}
      >
        <h2 className="gradient-title --medium-title">Log in</h2>
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

        <button
          className="button --dark --full-extension"
          type="submit"
          disabled={isLoading || isAuthenticating}
        >
          Log in!
        </button>
        <BlockLink className="button --full-extension" to={ROUTES.AUTH.SIGNUP}>
          sign up
        </BlockLink>
      </Form>
    </div>
  );
};

export default Login;
