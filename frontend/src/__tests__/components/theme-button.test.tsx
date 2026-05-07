import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ThemeButton } from "@/layouts/header/components/theme-button/index.tsx";

import { ThemeProvider } from "@/common/contexts/theme-context";

describe("ThemeButton", () => {
  it("toggles and persists the theme value", async () => {
    localStorage.clear();

    render(
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByRole("switch"));

    expect(localStorage.getItem("isDarkMode")).toBe("true");
    expect(screen.getByRole("switch")).toBeChecked();
  });
});
