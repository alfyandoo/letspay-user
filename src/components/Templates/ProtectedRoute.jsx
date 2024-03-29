import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const ProtectedRoute = ({ children, mode }) => {
  const { authUser } = useContext(AuthContext);
  const pathname = useLocation();

  if (!authUser && mode === "auth") {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }

  if (authUser && mode === "public") {
    return <Navigate to="/" state={{ from: pathname }} replace />;
  }

  return children;
};
