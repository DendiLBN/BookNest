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

    expect(screen.getByText(/subscribe to our newsletter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("renders footer navigation links", () => {
    renderFooter(true);

    expect(screen.getByRole("link", { name: /about us/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /terms of service/i })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute(
      "href",
      "/privacy",
    );
  });
});
