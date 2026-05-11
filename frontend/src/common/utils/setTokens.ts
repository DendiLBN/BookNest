import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common/consts/local-storage";
import type { TTokens } from "@/features/auth/types";

export const setTokens = (tokens: TTokens) => {
  localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
};
