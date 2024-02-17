import { ReactNode, useEffect } from "react";
import { auth } from "../services/authService";
import ROUTES from "../consts/routes";
import { useAppStore } from "../store/store";
import useAutomaticLogin from "../hooks/useAutomaticLogin";

interface AuthRouteProps {
  children: ReactNode;
  redirectWhenSuccess?: string;
  defaultRedirectWhenError?: boolean;
  showContent?: boolean;
}

const AuthRoute = ({
  children,
  redirectWhenSuccess = undefined,
  defaultRedirectWhenError = true,
  showContent = false,
}: AuthRouteProps) => {
  const isAuth = useAppStore((state) => state.isAuth);
  const { mutate } = useAutomaticLogin({
    fetchFn: () => auth(),
    redirectWhenError: defaultRedirectWhenError ? ROUTES.AUTH.LOGIN : undefined,
    redirectWhenSuccess: redirectWhenSuccess,
    onSettled: () => {
      setIsAuthenticating(false);
    },
  });
  const setIsAuthenticating = useAppStore((state) => state.setIsAuthenticating);

  useEffect(() => {
    if (!isAuth) {
      setIsAuthenticating(true);
      mutate({});
    }
  }, [isAuth, mutate, setIsAuthenticating]);

  if (showContent) return children;
  return <>{isAuth && children}</>;
};
export default AuthRoute;
