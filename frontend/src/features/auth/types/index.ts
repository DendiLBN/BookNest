import type { TUser } from "@/features/users/types";

export type TRegisterUserRequestBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type TRegisterUserParams = {
  data: TRegisterUserRequestBody;
  onSuccess: (data: TUser) => void;
  onError: () => void;
};

export type TRegisterUserResponse = {
  firstName: string;
  email: string;
};

export type TLoginUserRequestBody = {
  email: string;
  password: string;
};

export type TLoginUserParams = {
  data: TLoginUserRequestBody;
  onSuccess: (data: TUser) => void;
  onError: () => void;
};

export type TLoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TLogoutUserResponse = boolean;

export type TLogoutUserParams = {
  onSuccess: (data: void) => void;
  onError: () => void;
};

export type TForgotPasswordEmail = {
  email: string;
};

export type TForgotPasswordParams = {
  data: TForgotPasswordEmail;
  onSuccess: (data: void) => void;
  onError: () => void;
};

export type TForgotPasswordProps = {
  visible: boolean;
};

export type TResetPasswordParams = {
  oldPassword: string;
  newPassword: string;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TOnSuccessRegisterProps = {
  firstName: string;
  email: string;
};
