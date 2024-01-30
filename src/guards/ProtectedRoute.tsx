import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  canActive: boolean;
  children: ReactNode;
  path?: string;
}

const ProtectedRoute = ({ canActive, path, children }: ProtectedRouteProps) => {
  if (!path && !canActive) {
    return;
  }
  if (!canActive) {
    return <Navigate to={path || ""} />;
  }
  return children;
};
export default ProtectedRoute;
