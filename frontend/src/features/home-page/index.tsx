import { ActiveShelves } from "@/features/home-page/components/active-shelves";
import { DashboardFeedback } from "@/features/home-page/components/dashboard-feedback";
import { DashboardHero } from "@/features/home-page/components/dashboard-hero";
import { DashboardStats } from "@/features/home-page/components/dashboard-stats";
import { FeaturedShelves } from "@/features/home-page/components/featured-shelves";
import { HomeInfoCards } from "@/features/home-page/components/home-info-cards";
import { QuickActions } from "@/features/home-page/components/quick-actions";

import { useHomeDashboard } from "@/features/home-page/hooks/useHomeDashboard";

export const HomeView = () => {
  const {
    catalogStatus,
    dashboardStats,
    featuredBooks,
    hasBooks,
    isError,
    isLoading,
    topCategories,
  } = useHomeDashboard();

  return (
    <div className="flex flex-col gap-l">
      <DashboardHero catalogStatus={catalogStatus} />
      <DashboardFeedback isError={isError} isLoading={isLoading} />
      <DashboardStats dashboardStats={dashboardStats} />

      <section className="grid grid-cols-1 gap-s lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.85fr)]">
        <FeaturedShelves books={featuredBooks} hasBooks={hasBooks} />
        <QuickActions />
        <ActiveShelves categories={topCategories} />
      </section>

      <HomeInfoCards />
    </div>
  );
};
