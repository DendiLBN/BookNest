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

import { useFetchBooksQuery } from "@/store/api/books";

export const HomeView = () => {
  const { data: books = [], isFetching } = useFetchBooksQuery({
    page: 1,
    perPage: 8,
    searchString: "",
    category: [],
  });

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
    <div className="flex flex-col gap-[var(--section-gap)]">
      <section className="flex flex-col items-start justify-between gap-6 rounded-lg bg-[linear-gradient(110deg,rgba(22,101,52,0.94),rgba(21,94,117,0.9)),url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-6 text-[var(--color-text-inverse)] shadow-[var(--shadow-m)] lg:flex-row lg:items-center lg:p-8">
        <div>
          <p className="mb-2 font-semibold tracking-normal text-[var(--color-highlight)] uppercase">
            Bookstore dashboard
          </p>
          <h1 className="m-0 text-[1.55rem] leading-tight font-bold md:text-[2.1rem]">
            Your bookstore command center
          </h1>
          <p className="mt-3 max-w-[760px] text-base text-[var(--color-accent-soft)]">
            Track catalog activity, review featured shelves, and keep the store ready for readers.
          </p>
        </div>
        <Link
          className="shrink-0 rounded-md bg-[var(--color-text-inverse)] px-4 py-3 font-bold text-[var(--color-brand)] no-underline hover:text-[var(--color-brand)]"
          to="/book"
        >
          Browse books
        </Link>
      </section>

      <section aria-label="Bookstore overview" className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {dashboardStats.map((stat) => (
          <article
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-s)]"
            key={stat.label}
          >
            <span className="block text-3xl leading-none font-extrabold text-[var(--color-accent)]">
              {stat.value}
            </span>
            <h2 className="mt-3 mb-1 text-sm font-bold text-[var(--color-text)]">{stat.label}</h2>
            <p className="m-0 text-[var(--color-text-muted)]">{stat.helper}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.85fr)]">
        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-[18px] shadow-[var(--shadow-s)] lg:row-span-2">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="m-0 text-xs font-bold text-[var(--color-text-muted)] uppercase">
                Featured shelves
              </p>
              <h2 className="mt-1 mb-0 text-lg font-bold text-[var(--color-text)]">
                Worth reading this week
              </h2>
            </div>
            <BookOutlined className="text-xl text-[var(--color-accent)]" />
          </div>

          <div className="flex flex-col gap-3">
            {featuredBooks.length > 0 ? (
              featuredBooks.map((book) => (
                <Link
                  className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-[var(--color-border)] p-3 text-inherit no-underline hover:border-[var(--color-accent)] sm:grid-cols-[52px_minmax(0,1fr)_auto]"
                  key={book._id}
                  to="/book"
                >
                  <div className="grid h-16 w-[52px] place-items-center overflow-hidden rounded-md bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
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
                    <h3 className="m-0 truncate text-base font-bold text-[var(--color-text)]">
                      {book.title}
                    </h3>
                    <p className="m-0 truncate text-[var(--color-text-muted)]">{book.author}</p>
                  </div>
                  <span className="col-start-2 font-bold text-[var(--color-warning)] sm:col-start-auto">
                    <StarFilled /> {book.rate}
                  </span>
                </Link>
              ))
            ) : (
              <p className="m-0 text-[var(--color-text-muted)]">
                Add books to the catalog to start building featured shelves.
              </p>
            )}
          </div>
        </article>

        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-[18px] shadow-[var(--shadow-s)]">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="m-0 text-xs font-bold text-[var(--color-text-muted)] uppercase">
                Inventory
              </p>
              <h2 className="mt-1 mb-0 text-lg font-bold text-[var(--color-text)]">
                Quick actions
              </h2>
            </div>
            <AppstoreOutlined className="text-xl text-[var(--color-accent)]" />
          </div>
          <div className="flex flex-col gap-3">
            <Link
              className="flex items-center gap-3 rounded-md bg-[var(--color-page)] px-3 py-3 font-bold text-[var(--color-text)] no-underline hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
              to="/book"
            >
              <BookOutlined />
              Manage catalog
            </Link>
            <Link
              className="flex items-center gap-3 rounded-md bg-[var(--color-page)] px-3 py-3 font-bold text-[var(--color-text)] no-underline hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
              to="/book"
            >
              <PlusCircleOutlined />
              Prepare new title
            </Link>
            <Link
              className="flex items-center gap-3 rounded-md bg-[var(--color-page)] px-3 py-3 font-bold text-[var(--color-text)] no-underline hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
              to="/book"
            >
              <ShoppingCartOutlined />
              Review baskets
            </Link>
          </div>
        </article>

        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-[18px] shadow-[var(--shadow-s)]">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="m-0 text-xs font-bold text-[var(--color-text-muted)] uppercase">
                Categories
              </p>
              <h2 className="mt-1 mb-0 text-lg font-bold text-[var(--color-text)]">
                Active shelves
              </h2>
            </div>
            <TagsOutlined className="text-xl text-[var(--color-accent)]" />
          </div>
          <div className="flex flex-col gap-3">
            {topCategories.length > 0 ? (
              topCategories.map(([category, count]) => (
                <div
                  className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] py-2"
                  key={category}
                >
                  <span className="text-slate-700">{category}</span>
                  <strong className="text-[var(--color-accent)]">{count}</strong>
                </div>
              ))
            ) : (
              <p className="m-0 text-[var(--color-text-muted)]">
                Categories will appear after books load.
              </p>
            )}
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-s)]">
          <h2 className="mb-2 text-lg font-bold">For customers</h2>
          <p className="m-0 leading-6 text-slate-700">
            Browse featured titles, compare categories, and keep favorite books close.
          </p>
        </article>
        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-s)]">
          <h2 className="mb-2 text-lg font-bold">For store owners</h2>
          <p className="m-0 leading-6 text-slate-700">
            Keep inventory readable, review ratings, and prepare catalog updates quickly.
          </p>
        </article>
        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-s)]">
          <h2 className="mb-2 text-lg font-bold">Account security</h2>
          <p className="m-0 leading-6 text-slate-700">
            Refresh your password regularly and avoid reusing the same one.
          </p>
          <Link
            className="mt-3 inline-block font-semibold text-[var(--color-accent)] no-underline hover:underline"
            to="/auth/change-password"
          >
            Change password
          </Link>
        </article>
      </section>
    </div>
  );
};
