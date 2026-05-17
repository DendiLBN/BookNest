import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { HomeView } from "@/features/home-page";

const useHomeDashboard = vi.fn();

vi.mock("@/features/home-page/hooks/useHomeDashboard", () => ({
  useHomeDashboard: () => useHomeDashboard(),
}));

vi.mock("@/common/users/useUser", () => ({
  default: () => ({
    user: {
      role: "customer",
    },
  }),
}));

const renderHomeView = () =>
  render(
    <MemoryRouter>
      <HomeView />
    </MemoryRouter>,
  );

describe("HomeView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading feedback while dashboard data loads", () => {
    useHomeDashboard.mockReturnValue({
      catalogStatus: "Syncing catalog data",
      dashboardStats: [],
      featuredBooks: [],
      hasBooks: false,
      isError: false,
      isLoading: true,
      topCategories: [],
    });

    renderHomeView();

    expect(screen.getByText("Loading dashboard data...")).toBeInTheDocument();
  });

  it("renders an error state when dashboard queries fail", () => {
    useHomeDashboard.mockReturnValue({
      catalogStatus: "Catalog ready",
      dashboardStats: [],
      featuredBooks: [],
      hasBooks: false,
      isError: true,
      isLoading: false,
      topCategories: [],
    });

    renderHomeView();

    expect(
      screen.getByText("Dashboard data could not be loaded. Try again in a moment."),
    ).toBeInTheDocument();
  });

  it("renders the empty featured shelves message when the catalog is empty", () => {
    useHomeDashboard.mockReturnValue({
      catalogStatus: "Catalog ready",
      dashboardStats: [],
      featuredBooks: [],
      hasBooks: false,
      isError: false,
      isLoading: false,
      topCategories: [],
    });

    renderHomeView();

    expect(
      screen.getByText("Add books to the catalog to start building featured shelves."),
    ).toBeInTheDocument();
  });
});
