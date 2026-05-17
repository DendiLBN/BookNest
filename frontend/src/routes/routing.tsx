import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import ChangePasswordForm from "@/features/login-page/components/forms/change-password-form";
import { AdminRoute } from "@/routes/components/admin-route";
import { ProtectedRoute } from "@/routes/components/protected-route";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { Error404 } from "@/common/error-boundary/error/404";
import OnSuccessRegister from "@/features/register-page/results";
import { Book } from "@/pages/Book/Books";
import { BookDetails } from "@/pages/BookDetails/BookDetails";
import { Cart } from "@/pages/Cart/Cart";
import { Favorites } from "@/pages/Favorites/Favorites";
import { Home } from "@/pages/Home/Home";
import { Orders } from "@/pages/Orders/Orders";
import { OrdersAdmin } from "@/pages/OrdersAdmin/OrdersAdmin";
import { Profile } from "@/pages/Profile/Profile";
import { selectIsLoggedIn } from "@/store/reducers/auth";

const AuthRoutes = lazy(() => import("@/routes/Auth.routes"));
const ProtectedRoutes = lazy(() => import("@/routes/Protected.routes"));

type TProtectedPageProps = {
  children: React.ReactNode;
  isLoggedIn: boolean;
  loading: boolean;
};

const ProtectedPage = ({ children, isLoggedIn, loading }: TProtectedPageProps) => (
  <ProtectedRoute isLoggedIn={isLoggedIn}>
    <Suspense fallback={loading}>{children}</Suspense>
  </ProtectedRoute>
);

export const LandingPageRouting = () => {
  const { loading } = useNotificationContext();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home />
          </ProtectedRoute>
        }
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
      {isLoggedIn && <Route path="/auth/*" element={<Navigate replace to="/home" />} />}

      <Route
        path="/cart"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Cart />
          </ProtectedPage>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Orders />
          </ProtectedPage>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <AdminRoute>
              <OrdersAdmin />
            </AdminRoute>
          </ProtectedPage>
        }
      />
      <Route
        path="/protected/*"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <ProtectedRoutes />
          </ProtectedPage>
        }
      />
      <Route
        path="/book/:bookId"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <BookDetails />
          </ProtectedPage>
        }
      />
      <Route
        path="/book/*"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Book />
          </ProtectedPage>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Favorites />
          </ProtectedPage>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedPage isLoggedIn={isLoggedIn} loading={loading}>
            <Profile />
          </ProtectedPage>
        }
      />
      <Route
        path="auth/change-password"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ChangePasswordForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
