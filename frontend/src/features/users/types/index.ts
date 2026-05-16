export type TUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  favoriteBookIds: string[];
  role: "admin" | "customer";
  avatarUrl?: string;
};

export type TUpdateProfilePayload = Pick<TUser, "email" | "firstName" | "lastName">;
