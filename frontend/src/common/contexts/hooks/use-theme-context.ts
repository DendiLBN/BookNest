import { useContext } from "react";

import { ThemeContext, TThemeContextProps } from "@/common/contexts/theme-context";

export const useThemeContext = (): NonNullable<TThemeContextProps> => {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useThemeFormContext must be used within a ThemeFormContext");
  }
  return ctx;
};
