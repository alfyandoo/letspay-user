import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const tokenUser = localStorage.getItem("tokenUser");

  if (!tokenUser) {
    return <Navigate to="/login" />;
  }

  return children;
};
