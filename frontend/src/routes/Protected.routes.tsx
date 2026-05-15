import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { Home } from "@/pages/Home/Home";

const ProtectedRoutes = () => {
  const { loading } = useNotificationContext();

  if (loading) return null;

  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default ProtectedRoutes;
