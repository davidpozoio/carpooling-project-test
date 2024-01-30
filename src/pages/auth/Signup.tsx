import { Link } from "react-router-dom";
import Form from "./components/Form";
import Input from "./components/Input";
import ROUTES from "../../consts/routes";
import { login } from "../../services/authService";
import useAutomaticLogin from "../../hooks/useAutomaticLogin";
import { LoginDto } from "../../models/authModel";

const Signup = () => {
  const { mutate } = useAutomaticLogin<LoginDto>({
    fetchFn: (data) => login(data),
    redirectWhenSuccess: ROUTES.NOTES.ME,
  });

  return (
    <>
      <h2>Sign up</h2>
      <Form
        fields={{ username: "", password: "", confirmPassword: "" }}
        onSubmit={(data) => {
          mutate({ username: data["username"], password: data["password"] });
        }}
      >
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
        <button type="submit">submit</button>
        <Link to={ROUTES.AUTH.LOGIN}>Log in</Link>
      </Form>
    </>
  );
};
export default Signup;
