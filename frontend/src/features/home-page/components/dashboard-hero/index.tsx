import { Link } from "react-router-dom";

type TDashboardHeroProps = {
  catalogStatus: string;
};

export const DashboardHero = ({ catalogStatus }: TDashboardHeroProps) => (
  <section className="relative overflow-hidden rounded-l border border-app-border bg-[linear-gradient(135deg,var(--color-surface),color-mix(in_srgb,var(--color-brand-soft)_72%,var(--color-surface)),color-mix(in_srgb,var(--color-accent-soft)_62%,var(--color-surface)))] p-m text-app-text shadow-app-m lg:p-l">
    <div className="absolute top-0 right-0 hidden h-full w-1/3 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--color-brand)_14%,transparent),transparent_68%)] lg:block" />
    <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
      <div>
        <p className="mb-xs font-semibold tracking-normal text-app-brand uppercase">
          BookNest dashboard
        </p>
        <h1 className="m-0 text-[1.55rem] leading-tight font-bold md:text-[2.1rem]">
          Your BookNest command center
        </h1>
        <p className="mt-3 max-w-190 text-base text-app-text-muted">
          Track catalog activity, review featured shelves, and keep the store ready for readers.
        </p>
        <span className="mt-5 inline-flex items-center rounded-md border border-app-border bg-app-surface px-3 py-2 text-sm font-semibold text-app-brand shadow-app-s">
          {catalogStatus}
        </span>
      </div>
      <Link
        className="shrink-0 rounded-m border border-app-border bg-app-surface px-s py-xs font-bold text-app-brand no-underline shadow-app-s transition hover:border-app-brand hover:bg-app-brand-soft"
        to="/book"
      >
        Browse books
      </Link>
    </div>
  </section>
);
