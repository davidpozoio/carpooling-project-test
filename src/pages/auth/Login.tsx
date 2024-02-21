import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
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
    redirectWhenSuccess: ROUTES.ROUTES.ME,
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
          { inputName: "email", message: "email is incorrect" },
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
        src="/wave-2.svg"
        alt="wave figure"
        width="500"
        height="500"
      />
      <img
        className="wave second"
        src="/wave-3.svg"
        alt="wave figure"
        width="500"
        height="500"
      />
      <Form
        className="form-container center-content"
        fields={{ email: "", password: "" }}
        onSubmit={(data) => {
          setBlokcLinks(true);
          mutate({ email: data["email"], password: data["password"] });
        }}
        errors={errors}
      >
        <h2 className="gradient-title --medium-title">Log in</h2>
        <Input
          label="Email: "
          name="email"
          placeholder="put an email"
          errors={{
            required: { value: true, message: "email is required*" },
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
