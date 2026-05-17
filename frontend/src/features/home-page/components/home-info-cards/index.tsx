import { Link } from "react-router-dom";

export const HomeInfoCards = () => (
  <section className="grid grid-cols-1 gap-s lg:grid-cols-3">
    <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
      <h2 className="mb-2 text-lg font-bold">For customers</h2>
      <p className="m-0 leading-6 text-app-text-muted">
        Browse featured titles, compare categories, and keep favorite books close.
      </p>
    </article>
    <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
      <h2 className="mb-2 text-lg font-bold">For store owners</h2>
      <p className="m-0 leading-6 text-app-text-muted">
        Keep inventory readable, review ratings, and prepare catalog updates quickly.
      </p>
    </article>
    <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
      <h2 className="mb-2 text-lg font-bold">Account security</h2>
      <p className="m-0 leading-6 text-app-text-muted">
        Refresh your password regularly and avoid reusing the same one.
      </p>
      <Link
        className="mt-xs inline-block font-semibold text-app-accent no-underline hover:underline"
        to="/auth/change-password"
      >
        Change password
      </Link>
    </article>
  </section>
);
