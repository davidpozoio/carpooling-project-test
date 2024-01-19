import { Link } from "react-router-dom";
import Form from "./components/Form";
import Input from "./components/Input";
import ROUTES from "../../consts/routes";

const Signup = () => {
  return (
    <>
      <h2>Sign up</h2>
      <Form fields={{ username: "", confirmPassword: "" }}>
        <Input
          label="Username:"
          placeholder="put an username"
          name="username"
          errors={{
            required: { value: true, message: "username is required*" },
          }}
        />
        <Input
          label="Confirm password:"
          placeholder="******"
          name="confirmPassword"
          errors={{
            required: { value: true, message: "password is required*" },
            minLength: {
              value: 8,
              message: "password must have min 8 digits*",
            },
          }}
        />
        <button type="submit">submit</button>
        <Link to={ROUTES.AUTH.LOGIN}>Log in</Link>
      </Form>
    </>
  );
};
export default Signup;
