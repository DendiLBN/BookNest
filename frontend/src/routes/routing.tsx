import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import ChangePasswordForm from "@/features/login-page/components/forms/change-password-form";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { Error404 } from "@/common/error-boundary/error/404";
import OnSuccessRegister from "@/features/register-page/results";
import { Book } from "@/pages/Book/Books";
import { BookDetails } from "@/pages/BookDetails/BookDetails";
import { Favorites } from "@/pages/Favorites/Favorites";
import { Home } from "@/pages/Home/Home";
import { selectIsLoggedIn } from "@/store/reducers/auth";

const AuthRoutes = lazy(() => import("@/routes/Auth.routes"));

const ProtectedRoutes = lazy(() => import("@/routes/Protected.routes"));

export const LandingPageRouting = () => {
  const { loading } = useNotificationContext();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/auth/login" replace />} />
      <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/auth/login" replace />} />
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
      {isLoggedIn && <Route path="/auth/*" element={<Navigate to="/home" replace />} />}
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
          path="/book/:bookId"
          element={
            <Suspense fallback={loading}>
              <BookDetails />
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
      {isLoggedIn && (
        <Route
          path="/favorites"
          element={
            <Suspense fallback={loading}>
              <Favorites />
            </Suspense>
          }
        />
      )}
      <Route
        path="auth/change-password"
        element={isLoggedIn ? <ChangePasswordForm /> : <Navigate to="/auth/login" replace />}
      />
    </Routes>
  );
};
