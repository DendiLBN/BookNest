export type TUser = {
  _id: string;
  email: string;
  firstName: string;
  favoriteBookIds?: string[];
  avatarUrl?: string;
};

export type TUserState = {
  _id: string;
  email: string;
  firstName: string;
  favoriteBookIds: string[];
  avatarUrl?: string;
};
