import { Route } from "react-router-dom";
import ROUTES from "../../consts/routes";
import Login from "./Login";
import Signup from "./Signup";

const AuthRouter = (
  <>
    <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
    <Route path={ROUTES.AUTH.SIGNUP} element={<Signup />} />
  </>
);

export default AuthRouter;
