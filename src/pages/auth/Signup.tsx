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
          label="First name:"
          placeholder="put your name"
          name="firstName"
          errors={{
            required: { value: true, message: "first name is required*" },
          }}
        />
        <Input
          label="Last name:"
          placeholder="put your last name"
          name="lastName"
          errors={{
            required: { value: true, message: "last name is required*" },
          }}
        />

        <Input
          label="Cell number:"
          type="number"
          placeholder="put your cell number"
          name="cellNumber"
          errors={{
            required: { value: true, message: "cell number is required*" },
          }}
        />

        <Input
          label="Identification:"
          type="number"
          placeholder="put your identification"
          name="identification"
          errors={{
            required: { value: true, message: "identification is required*" },
          }}
        />

        <Input
          label="Email:"
          placeholder="put an email"
          name="email"
          errors={{
            required: { value: true, message: "email is required*" },
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
