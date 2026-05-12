import type { Config } from "tailwindcss";

const spacing = {
  xs: "0.75rem", // 12px
  s: "1rem", // 16px
  sm: "1.25rem", // 20px
  m: "1.5rem", // 24px
  l: "2rem", // 32px
  xl: "2.5rem", // 40px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  "4.5": "1.125rem",
  "18": "4.5rem",
  "22": "5.5rem",
};

const config = {
  theme: {
    extend: {
      borderRadius: {
        xs: "0.25rem",
        s: "0.375rem",
        m: "0.5rem",
        l: "0.75rem",
      },
      boxShadow: {
        "app-s": "var(--shadow-s)",
        "app-m": "var(--shadow-m)",
      },
      colors: {
        app: {
          accent: "var(--color-accent)",
          "accent-soft": "var(--color-accent-soft)",
          border: "var(--color-border)",
          brand: "var(--color-brand)",
          "brand-soft": "var(--color-brand-soft)",
          "brand-strong": "var(--color-brand-strong)",
          highlight: "var(--color-highlight)",
          page: "var(--color-page)",
          surface: "var(--color-surface)",
          "surface-muted": "var(--color-surface-muted)",
          text: "var(--color-text)",
          "text-inverse": "var(--color-text-inverse)",
          "text-muted": "var(--color-text-muted)",
          warning: "var(--color-warning)",
        },
      },
      maxWidth: {
        content: "1980px",
      },
      spacing,
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
} satisfies Config;

export default config;
