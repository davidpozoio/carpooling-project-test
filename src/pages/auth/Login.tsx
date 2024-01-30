import { Link } from "react-router-dom";
import Form from "./components/Form";
import Input from "./components/Input";
import ROUTES from "../../consts/routes";
import { login } from "../../services/authService";
import { LoginDto } from "../../models/authModel";
import useAutomaticLogin from "../../hooks/useAutomaticLogin";

const Login = () => {
  const { mutate } = useAutomaticLogin<LoginDto>({
    fetchFn: (data) => login(data),
    redirectWhenSuccess: ROUTES.NOTES.ME,
  });

  return (
    <>
      <h2>Log in</h2>
      <Form
        fields={{ username: "", password: "" }}
        onSubmit={(data) => {
          mutate({ username: data["username"], password: data["password"] });
        }}
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

        <button type="submit">Log in!</button>
        <Link to={ROUTES.AUTH.SIGNUP}>sign up</Link>
      </Form>
    </>
  );
};

export default Login;
