export type TRegisterUserResponse = {
  firstName: string;
  email: string;
};

export type TLoginUserResponseData = {
  email: string;
  firstName: string;
  favoriteBookIds?: string[];
  avatarUrl?: string;
};

export type TLoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TLogOutUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TUser = {
  _id: string;
  email: string;
  firstName: string;
  favoriteBookIds?: string[];
  avatarUrl?: string;
};
