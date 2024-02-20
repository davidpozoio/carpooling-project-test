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
          { inputName: "email", message: "El e-mail es incorrecto" },
        ]);
      }
      if (codeError === ERROR_CODES.E2001.CODE) {
        setErrors((prev) => [
          ...prev,
          { inputName: "password", message: "La contraseña es incorrecta" },
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
          label="E-mail: "
          name="email"
          placeholder="Ingresar el e-mail"
          errors={{
            required: { value: true, message: "Es necesario ingresar el e-mail*" },
          }}
        />
        <Input
          label="Password: "
          name="password"
          type="password"
          placeholder="********"
          errors={{
            required: { value: true, message: "Es necesario ingresar la contraseña*" },
          }}
        />

        <button
          className="button --dark --full-extension"
          type="submit"
          disabled={isLoading || isAuthenticating}
        >
          Iniciar Sesión
        </button>
        <BlockLink className="button --full-extension" to={ROUTES.AUTH.SIGNUP}>
          Registrarse
        </BlockLink>
      </Form>
    </div>
  );
};

export default Login;
