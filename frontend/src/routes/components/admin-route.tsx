import { Navigate } from "react-router-dom";

import useUser from "@/common/users/useUser";

type TAdminRouteProps = {
  children: React.ReactNode;
};

export const AdminRoute = ({ children }: TAdminRouteProps) => {
  const { user } = useUser();

  return user?.role === "admin" ? children : <Navigate replace to="/dashboard" />;
};
