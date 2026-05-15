import { useMemo } from "react";
import { Link } from "react-router-dom";

import {
  AppstoreOutlined,
  BookOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  StarFilled,
  TagsOutlined,
} from "@ant-design/icons";

import { useFetchBooksQuery } from "@/features/book-page/api";

export const HomeView = () => {
  const { data: booksResponse, isFetching } = useFetchBooksQuery({
    page: 1,
    perPage: 8,
    searchString: "",
    category: [],
  });
  const books = useMemo(() => booksResponse?.data ?? [], [booksResponse]);

  const dashboardStats = useMemo(() => {
    const categories = new Set(books.flatMap((book) => book.category));
    const averageRating =
      books.length > 0
        ? (books.reduce((total, book) => total + book.rate, 0) / books.length).toFixed(1)
        : "0.0";

    return [
      {
        label: "Catalog titles",
        value: books.length,
        helper: isFetching ? "Refreshing catalog" : "Ready to browse",
      },
      {
        label: "Categories",
        value: categories.size,
        helper: "Available shelves",
      },
      {
        label: "Average rating",
        value: averageRating,
        helper: "Across visible titles",
      },
    ];
  }, [books, isFetching]);

  const featuredBooks = books.slice(0, 4);
  const catalogStatus = isFetching ? "Syncing catalog data" : "Catalog ready";

  const topCategories = useMemo(() => {
    const categoryCounts = books
      .flatMap((book) => book.category)
      .reduce<Record<string, number>>((acc, category) => {
        acc[category] = (acc[category] ?? 0) + 1;
        return acc;
      }, {});

    return Object.entries(categoryCounts)
      .sort(([, firstCount], [, secondCount]) => secondCount - firstCount)
      .slice(0, 5);
  }, [books]);

  return (
    <div className="flex flex-col gap-l">
      <section className="relative overflow-hidden rounded-l border border-app-border bg-[linear-gradient(110deg,color-mix(in_srgb,var(--color-brand-strong)_88%,black),color-mix(in_srgb,var(--color-accent)_72%,black)),url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-m text-app-text-inverse shadow-app-m lg:p-l">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-highlight)_16%,transparent))] lg:block" />
        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="mb-xs font-semibold tracking-normal text-app-highlight uppercase">
              BookNest dashboard
            </p>
            <h1 className="m-0 text-[1.55rem] leading-tight font-bold md:text-[2.1rem]">
              Your BookNest command center
            </h1>
            <p className="mt-3 max-w-[760px] text-base text-[color-mix(in_srgb,#ffffff_84%,var(--color-highlight))]">
              Track catalog activity, review featured shelves, and keep the store ready for readers.
            </p>
            <span className="mt-5 inline-flex items-center rounded-md border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold backdrop-blur">
              {catalogStatus}
            </span>
          </div>
          <Link
            className="shrink-0 rounded-m bg-app-brand px-s py-xs font-bold text-app-text-inverse no-underline shadow-app-s transition hover:bg-app-brand-strong"
            to="/book"
          >
            Browse books
          </Link>
        </div>
      </section>

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

      <section className="grid grid-cols-1 gap-s lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.85fr)]">
        <article className="rounded-l border border-app-border bg-app-surface p-4.5 shadow-app-s lg:row-span-2">
          <div className="mb-s flex items-start justify-between gap-xs">
            <div>
              <p className="m-0 text-xs font-bold text-app-text-muted uppercase">
                Featured shelves
              </p>
              <h2 className="mt-1 mb-0 text-lg font-bold text-app-text">Worth reading this week</h2>
            </div>
            <BookOutlined className="text-xl text-app-accent" />
          </div>

          <div className="flex flex-col gap-xs">
            {featuredBooks.length > 0 ? (
              featuredBooks.map((book) => (
                <Link
                  className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-xs rounded-l border border-app-border bg-app-surface-muted p-xs text-inherit no-underline transition hover:border-app-accent hover:bg-app-surface-muted sm:grid-cols-[52px_minmax(0,1fr)_auto]"
                  key={book._id}
                  to="/book"
                >
                  <div className="grid h-16 w-[52px] place-items-center overflow-hidden rounded-m bg-app-accent-soft text-app-accent">
                    {book.coverImageUrl ? (
                      <img
                        className="h-full w-full object-cover"
                        src={book.coverImageUrl}
                        alt={book.title}
                      />
                    ) : (
                      <BookOutlined />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="m-0 truncate text-base font-bold text-app-text">{book.title}</h3>
                    <p className="m-0 truncate text-app-text-muted">{book.author}</p>
                  </div>
                  <span className="col-start-2 font-bold text-app-warning sm:col-start-auto">
                    <StarFilled /> {book.rate}
                  </span>
                </Link>
              ))
            ) : (
              <p className="m-0 text-app-text-muted">
                Add books to the catalog to start building featured shelves.
              </p>
            )}
          </div>
        </article>

        <article className="rounded-l border border-app-border bg-app-surface p-4.5 shadow-app-s">
          <div className="mb-s flex items-start justify-between gap-xs">
            <div>
              <p className="m-0 text-xs font-bold text-app-text-muted uppercase">Inventory</p>
              <h2 className="mt-1 mb-0 text-lg font-bold text-app-text">Quick actions</h2>
            </div>
            <AppstoreOutlined className="text-xl text-app-accent" />
          </div>
          <div className="flex flex-col gap-xs">
            <Link
              className="flex items-center gap-xs rounded-m bg-app-surface-muted px-xs py-xs font-bold text-app-text no-underline transition hover:bg-app-accent-soft hover:text-app-accent"
              to="/book"
            >
              <BookOutlined />
              Manage catalog
            </Link>
            <Link
              className="flex items-center gap-xs rounded-m bg-app-surface-muted px-xs py-xs font-bold text-app-text no-underline transition hover:bg-app-accent-soft hover:text-app-accent"
              to="/book"
            >
              <PlusCircleOutlined />
              Prepare new title
            </Link>
            <Link
              className="flex items-center gap-xs rounded-m bg-app-surface-muted px-xs py-xs font-bold text-app-text no-underline transition hover:bg-app-accent-soft hover:text-app-accent"
              to="/book"
            >
              <ShoppingCartOutlined />
              Review baskets
            </Link>
          </div>
        </article>

        <article className="rounded-l border border-app-border bg-app-surface p-4.5 shadow-app-s">
          <div className="mb-s flex items-start justify-between gap-xs">
            <div>
              <p className="m-0 text-xs font-bold text-app-text-muted uppercase">Categories</p>
              <h2 className="mt-1 mb-0 text-lg font-bold text-app-text">Active shelves</h2>
            </div>
            <TagsOutlined className="text-xl text-app-accent" />
          </div>
          <div className="flex flex-col gap-xs">
            {topCategories.length > 0 ? (
              topCategories.map(([category, count]) => (
                <div
                  className="flex items-center justify-between gap-xs border-b border-app-border py-2"
                  key={category}
                >
                  <span className="text-app-text">{category}</span>
                  <strong className="text-app-accent">{count}</strong>
                </div>
              ))
            ) : (
              <p className="m-0 text-app-text-muted">Categories will appear after books load.</p>
            )}
          </div>
        </article>
      </section>

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
    </div>
  );
};
