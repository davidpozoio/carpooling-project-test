import { Navigate, Route } from "react-router-dom";
import ROUTES from "../../consts/routes";
import Login from "./Login";
import Signup from "./Signup";

const AuthRouter = (
  <>
    <Route path="" element={<Navigate to={ROUTES.AUTH.LOGIN} />} />
    <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
    <Route path={ROUTES.AUTH.SIGNUP} element={<Signup />} />
  </>
);

export default AuthRouter;
