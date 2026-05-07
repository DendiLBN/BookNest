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
            colorPrimary: isDarkMode ? "#00b96b" : "#E0282E",
            colorText: isDarkMode ? "#e0e0e0" : "#333333",
            colorBgBase: isDarkMode ? "#1e1e2f" : "#f8f9fa",
            colorBgContainer: isDarkMode ? "#2b2b3c" : "#ffffff",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
