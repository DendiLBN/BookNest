import type { TDashboardStat } from "@/features/home-page/types";

type TDashboardStatsProps = {
  dashboardStats: TDashboardStat[];
};

export const DashboardStats = ({ dashboardStats }: TDashboardStatsProps) => (
  <section aria-label="BookNest overview" className="grid grid-cols-1 gap-s md:grid-cols-3">
    {dashboardStats.map((stat) => (
      <article
        className="rounded-l border border-app-border bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-muted))] p-s shadow-app-s"
        key={stat.label}
      >
        <span className="block text-3xl leading-none font-extrabold text-app-accent">
          {stat.value}
        </span>
        <h2 className="mt-xs mb-1 text-sm font-bold text-app-text">{stat.label}</h2>
        <p className="m-0 text-app-text-muted">{stat.helper}</p>
      </article>
    ))}
  </section>
);
