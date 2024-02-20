import Form from "./components/Form";
import Input from "./components/Input";
import ROUTES from "../../consts/routes";
import { signup } from "../../services/authService";
import useAutomaticLogin from "../../hooks/useAutomaticLogin";
import { ErrorAuthResponse, SignupDto } from "../../models/authModel";
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

  const { mutate, isLoading } = useAutomaticLogin<SignupDto>({
    fetchFn: (data) => signup(data),
    redirectWhenSuccess: ROUTES.ROUTES.ME,
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
      <Form
        className="form-container center-content"
        fields={{
          firstName: "",
          lastName: "",
          cellNumber: "",
          identification: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(data) => {
          setBlockLinks(true);
          mutate({
            firstName: data["firstName"],
            lastName: data["lastName"],
            cellNumber: data["cellNumber"],
            indentification: data["identification"],
            email: data["email"],
            password: data["password"],
          });
        }}
        errors={errors}
      >
        <h2 className="gradient-title --medium-title">Sign up</h2>
        <Input
          label="Nombres:"
          placeholder="Ingresar Nombres"
          name="firstName"
          errors={{
            required: { value: true, message: "Es necesario ingresar los Nombres*" },
          }}
        />
        <Input
          label="Apellidos:"
          placeholder="Ingresar los Apellidos"
          name="lastName"
          errors={{
            required: { value: true, message: "Es necesario ingresar sus Apellidos*" },
          }}
        />

        <Input
          label="Número de celular:"
          type="number"
          placeholder="Ingresar su número celular"
          name="cellNumber"
          errors={{
            required: { value: true, message: "Es necesario ingresar el número de celular*" },
          }}
        />

        <Input
          label="Identificación:"
          type="number"
          placeholder="Ingresar su identificación"
          name="identification"
          errors={{
            required: { value: true, message: "Es necesario ingresar su identificación*" },
          }}
        />

        <Input
          label="E-mail:"
          placeholder="Ingresar su e-mail"
          name="email"
          errors={{
            required: { value: true, message: "Es necesario ingresar su E-mail*" },
          }}
        />

        <Input
          label="Contraseña: "
          name="password"
          placeholder="********"
          type="password"
          errors={{
            required: { value: true, message: "Es necesario ingresar su contraseña*" },
            minLength: {
              value: 8,
              message: "password must have min 8 digits*",
            },
          }}
        />

        <Input
          label="Confirmar contraseña:"
          placeholder="******"
          name="confirmPassword"
          type="password"
          errors={{
            required: { value: true, message: "Es necesario confirmar la contraseña*" },
          }}
          confirmPassword={true}
        />
        <span>{errorMessage}</span>
        <button
          type="submit"
          disabled={isLoading || isAuthenticating}
          className="button --dark --full-extension"
        >
          Confirmar
        </button>
        <BlockLink className="button --full-extension" to={ROUTES.AUTH.LOGIN}>
          Iniciar Sesión
        </BlockLink>
      </Form>
    </div>
  );
};
export default Signup;
