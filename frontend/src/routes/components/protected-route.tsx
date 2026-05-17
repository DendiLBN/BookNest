import { Navigate } from "react-router-dom";

type TProtectedRouteProps = {
  children: React.ReactNode;
  isLoggedIn: boolean;
};

export const ProtectedRoute = ({ children, isLoggedIn }: TProtectedRouteProps) =>
  isLoggedIn ? children : <Navigate replace to="/auth/login" />;
