import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import OnSuccessRegister from "@/features/register-page/results";

const CurrentPath = () => {
  const location = useLocation();

  return <span>{location.pathname}</span>;
};

describe("OnSuccessRegister", () => {
  it("renders registered user details and redirects to login", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/auth/register/success",
            state: { firstName: "Damian", email: "damian@example.com" },
          },
        ]}
      >
        <Routes>
          <Route path="/auth/register/success" element={<OnSuccessRegister />} />
          <Route path="/auth/login" element={<CurrentPath />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/damian@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome damian/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /go to login page/i }));

    expect(screen.getByText("/auth/login")).toBeInTheDocument();
  });

  it("renders a safe fallback when opened without route state", () => {
    render(
      <MemoryRouter initialEntries={["/success"]}>
        <Routes>
          <Route path="/success" element={<OnSuccessRegister />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/registration completed/i)).toBeInTheDocument();
    expect(screen.getByText(/you can now log in/i)).toBeInTheDocument();
  });
});
