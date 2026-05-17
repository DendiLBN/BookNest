import { BookOutlined, HeartFilled, LockOutlined } from "@ant-design/icons";

type TProfileStatsProps = {
  favoriteBooksCount: number;
};

export const ProfileStats = ({ favoriteBooksCount }: TProfileStatsProps) => (
  <section className="grid gap-s md:grid-cols-3">
    <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
      <HeartFilled className="text-xl text-app-brand" />
      <strong className="mt-xs block text-2xl text-app-text">{favoriteBooksCount}</strong>
      <p className="m-0 text-app-text-muted">Favorite books</p>
    </article>
    <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
      <BookOutlined className="text-xl text-app-accent" />
      <strong className="mt-xs block text-2xl text-app-text">Active</strong>
      <p className="m-0 text-app-text-muted">Account status</p>
    </article>
    <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
      <LockOutlined className="text-xl text-app-warning" />
      <strong className="mt-xs block text-2xl text-app-text">Protected</strong>
      <p className="m-0 text-app-text-muted">Password access</p>
    </article>
  </section>
);
