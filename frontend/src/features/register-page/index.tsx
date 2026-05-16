import { useContext } from "react";

import "@/assets/layouts-styles/register-styles/register.css";

import { RegisterForm } from "@/features/register-page/components/register-form";

import { useRegistrationUser } from "@/features/register-page/hooks/useRegistrationUser";

import { ThemeContext } from "@/common/contexts/theme-context";

import { AUTH_IMAGE_URLS } from "@/features/auth/consts/auth-images";
import type { TRegisterUserRequestBody } from "@/features/auth/types";
import type { TRegisterFormValues } from "@/features/register-page/types";

export const RegisterPage = () => {
  const registrationUser = useRegistrationUser();
  const themeContext = useContext(ThemeContext);

  if (!registrationUser || !themeContext) {
    return null;
  }

  const { isDarkMode } = themeContext;
  const { loading, submitRegistration } = registrationUser;

  const handleSubmitRegister = ({ email, firstName, lastName, password }: TRegisterFormValues) => {
    const requestBody: TRegisterUserRequestBody = {
      email,
      firstName,
      lastName,
      password,
    };

    submitRegistration(requestBody);
  };

  return (
    <div className="register__container">
      <img className="register__image" src={AUTH_IMAGE_URLS.register} alt="Books on a shelf" />
      <RegisterForm isDarkMode={isDarkMode} loading={loading} onFinish={handleSubmitRegister} />
    </div>
  );
};

export default RegisterPage;
