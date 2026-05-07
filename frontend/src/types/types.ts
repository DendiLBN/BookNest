import { Key } from "react";

import { TUser } from "@/types/api/auth-user";

export type TBookBody = {
  _id: string;
  category: string[];
  key: string;
  title: string;
  rate: number;
  author: string;
  tags: string[];
  avatar?: string;
  coverImageUrl?: string;
};

export type IBookSearchProps = {
  bookSearchText: string;
  value: string;
};

export type TDeleteBooksButtonProps = {
  selectedBookRowKeys: Key[];
  loading: boolean;
  onDelete: () => void;
};

export type TUseFilteredBooksProps = {
  bookSearchText: string;
  selectedCategories: string[];
  fetchBookList: TBookBody[];
  setBookList: (filteredBookList: TBookBody[]) => void;
};

export type TCategorySelectProps = {
  selectedCategories: string[];
  onChangeCategories: (select: string[]) => void;
};

export type TBookSearchProps = {
  bookSearchText: string;
  onSearch: (value: string) => void;
};

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

export type TLoginUserRequestBody = {
  email: string;
  password: string;
};

export type TLoginUserParams = {
  data: TLoginUserRequestBody;
  onSuccess: (data: TUser) => void;
  onError: () => void;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TLogoutRequestBody = {
  accessToken: string;
  refreshToken: string;
};

export type TLogoutUserParams = {
  onSuccess: (data: void) => void;
  onError: () => void;
};

export type TForgotPasswordEmail = {
  email: string;
};

export type TResetPasswordParams = {
  oldPassword: string;
  newPassword: string;
};

export type TForgotPasswordParams = {
  data: TForgotPasswordEmail;
  onSuccess: (data: void) => void;
  onError: () => void;
};

export type TForgotPasswordProps = {
  visible: boolean;
};

export type TOnSuccessRegisterProps = {
  firstName: string;
  email: string;
};
