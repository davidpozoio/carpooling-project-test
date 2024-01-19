import { Link } from "react-router-dom";
import Form from "./components/Form";
import Input from "./components/Input";
import ROUTES from "../../consts/routes";

const Login = () => {
  return (
    <>
      <h2>Log in</h2>
      <Form fields={{ username: "" }}>
        <Input
          label="Username: "
          name="username"
          placeholder="put an username"
          errors={{
            required: { value: true, message: "username is required*" },
          }}
        />
        <button type="submit">submit</button>
        <Link to={ROUTES.AUTH.SIGNUP}>sign up</Link>
      </Form>
    </>
  );
};

export default Login;
