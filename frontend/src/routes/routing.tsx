import { lazy, Suspense } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { Home } from "@/pages/Home/Home";

import { Book } from "@/pages/Book/Books";

import { selectIsLoggedIn } from "@/store/reducers/auth";

import { Error404 } from "@/common/error-boundary/error/404";

import OnSuccessRegister from "@/features/register-page/results";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import ChangePasswordForm from "@/features/login-page/components/forms/change-password-form";

const AuthRoutes = lazy(() => import("@/routes/Auth.routes"));

const ProtectedRoutes = lazy(() => import("@/routes/Protected.routes"));

export const LandingPageRouting = () => {
  const { loading } = useNotificationContext();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/auth/login" replace />}
      />
      <Route
        path="/home"
        element={isLoggedIn ? <Home /> : <Navigate to="/auth/login" replace />}
      />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Home /> : <Navigate to="/auth/login" replace />}
      />

      <Route path="/success" element={<OnSuccessRegister />} />
      <Route path="/*" element={<Error404 />} />

      {!isLoggedIn && (
        <Route
          path="/auth/*"
          element={
            <Suspense fallback={loading}>
              <AuthRoutes />
            </Suspense>
          }
        />
      )}
      {isLoggedIn && (
        <Route path="/auth/*" element={<Navigate to="/home" replace />} />
      )}
      {isLoggedIn && (
        <Route
          path="/protected/*"
          element={
            <Suspense fallback={loading}>
              <ProtectedRoutes />
            </Suspense>
          }
        />
      )}
      {isLoggedIn && (
        <Route
          path="/book/*"
          element={
            <Suspense fallback={loading}>
              <Book />
            </Suspense>
          }
        />
      )}
      <Route path="auth/change-password" element={<ChangePasswordForm />} />
    </Routes>
  );
};
