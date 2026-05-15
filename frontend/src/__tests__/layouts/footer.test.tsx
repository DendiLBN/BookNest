import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ThemeContext } from "@/common/contexts/theme-context";

import LandingPageFooter from "@/layouts/footer/footer";

const renderFooter = (isDarkMode = false) =>
  render(
    <ThemeContext.Provider
      value={{
        isDarkMode,
        handleToggleTheme: vi.fn(),
        previous: isDarkMode ? "light" : "dark",
      }}
    >
      <LandingPageFooter />
    </ThemeContext.Provider>,
  );

describe("LandingPageFooter", () => {
  it("renders newsletter controls", () => {
    renderFooter();

    expect(screen.getByRole("heading", { name: /build your shelf/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("does not render inactive footer navigation links", () => {
    renderFooter(true);

    expect(screen.queryByRole("link", { name: /about us/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /contact/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /terms of service/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /privacy policy/i })).not.toBeInTheDocument();
  });
});
