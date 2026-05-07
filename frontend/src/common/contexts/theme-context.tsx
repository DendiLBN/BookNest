import { createContext, CSSProperties, ReactNode, useState } from "react";

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
  const themeVariables: CSSProperties = {
    "--color-page": isDarkMode ? "#111827" : "#f8fafc",
    "--color-surface": isDarkMode ? "#1f2937" : "#ffffff",
    "--color-surface-muted": isDarkMode ? "#374151" : "#f1f5f9",
    "--color-border": isDarkMode ? "#374151" : "#e2e8f0",
    "--color-text": isDarkMode ? "#e5e7eb" : "#0f172a",
    "--color-text-muted": isDarkMode ? "#9ca3af" : "#64748b",
    "--color-text-inverse": "#f8fafc",
    "--color-brand": isDarkMode ? "#22c55e" : "#166534",
    "--color-brand-strong": isDarkMode ? "#86efac" : "#14532d",
    "--color-accent": isDarkMode ? "#2dd4bf" : "#0f766e",
    "--color-accent-soft": isDarkMode ? "#134e4a" : "#ecfeff",
    "--color-warning": isDarkMode ? "#fbbf24" : "#b45309",
    "--color-highlight": isDarkMode ? "#bef264" : "#d9f99d",
  } as CSSProperties;

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
        <div
          className="min-h-screen bg-[var(--color-page)] text-[var(--color-text)]"
          data-theme={isDarkMode ? "dark" : "light"}
          style={themeVariables}
        >
          {children}
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
