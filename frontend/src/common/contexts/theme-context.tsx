import { createContext, ReactNode, useState } from "react";

import { ConfigProvider, theme } from "antd";

export type TThemeContextProps =
  | {
      isDarkMode: boolean;
      handleToggleTheme: () => void;
      previous: string;
    }
  | undefined;

export const ThemeContext = createContext<TThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isDarkMode") || "false"),
  );

  const handleToggleTheme = () => {
    const setNewValue = !isDarkMode;
    localStorage.setItem("isDarkMode", JSON.stringify(setNewValue));
    setIsDarkMode(setNewValue);
  };

  const previous = isDarkMode ? "light" : "dark";

  return (
    <ThemeContext.Provider value={{ isDarkMode, handleToggleTheme, previous }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: isDarkMode ? "#86efac" : "#166534",
            colorText: isDarkMode ? "#e5e7eb" : "#0f172a",
            colorBgBase: isDarkMode ? "#020617" : "#f8fafc",
            colorBgContainer: isDarkMode ? "#111827" : "#ffffff",
            colorBorder: isDarkMode ? "#334155" : "#e2e8f0",
          },
        }}
      >
        <div className="app-shell" data-theme={isDarkMode ? "dark" : "light"}>
          {children}
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
