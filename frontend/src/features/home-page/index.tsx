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

import "@/assets/layouts-styles/home-styles/home.css";

import { useFetchBooksQuery } from "@/features/book-page/api";

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
    <div className="home-page">
      <section className="home-page__hero">
        <div>
          <p className="home-page__eyebrow">Bookstore dashboard</p>
          <h1 className="home-page__title">Your bookstore command center</h1>
          <p className="home-page__subtitle">
            Track catalog activity, review featured shelves, and keep the store ready for readers.
          </p>
        </div>
        <Link className="home-page__primary-link" to="/book">
          Browse books
        </Link>
      </section>

      <section className="home-page__stats" aria-label="Bookstore overview">
        {dashboardStats.map((stat) => (
          <article className="home-page__stat" key={stat.label}>
            <span>{stat.value}</span>
            <h2>{stat.label}</h2>
            <p>{stat.helper}</p>
          </article>
        ))}
      </section>

      <section className="home-page__grid">
        <article className="home-page__panel home-page__panel--wide">
          <div className="home-page__section-heading">
            <div>
              <p className="home-page__section-eyebrow">Featured shelves</p>
              <h2>Worth reading this week</h2>
            </div>
            <BookOutlined />
          </div>

          <div className="home-page__book-list">
            {featuredBooks.length > 0 ? (
              featuredBooks.map((book) => (
                <Link className="home-page__book-row" key={book._id} to="/book">
                  <div className="home-page__book-cover">
                    {book.coverImageUrl ? (
                      <img src={book.coverImageUrl} alt={book.title} />
                    ) : (
                      <BookOutlined />
                    )}
                  </div>
                  <div>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                  </div>
                  <span>
                    <StarFilled /> {book.rate}
                  </span>
                </Link>
              ))
            ) : (
              <p className="home-page__empty-state">
                Add books to the catalog to start building featured shelves.
              </p>
            )}
          </div>
        </article>

        <article className="home-page__panel">
          <div className="home-page__section-heading">
            <div>
              <p className="home-page__section-eyebrow">Inventory</p>
              <h2>Quick actions</h2>
            </div>
            <AppstoreOutlined />
          </div>
          <div className="home-page__actions">
            <Link to="/book">
              <BookOutlined />
              Manage catalog
            </Link>
            <Link to="/book">
              <PlusCircleOutlined />
              Prepare new title
            </Link>
            <Link to="/book">
              <ShoppingCartOutlined />
              Review baskets
            </Link>
          </div>
        </article>

        <article className="home-page__panel">
          <div className="home-page__section-heading">
            <div>
              <p className="home-page__section-eyebrow">Categories</p>
              <h2>Active shelves</h2>
            </div>
            <TagsOutlined />
          </div>
          <div className="home-page__categories">
            {topCategories.length > 0 ? (
              topCategories.map(([category, count]) => (
                <div className="home-page__category" key={category}>
                  <span>{category}</span>
                  <strong>{count}</strong>
                </div>
              ))
            ) : (
              <p className="home-page__empty-state">Categories will appear after books load.</p>
            )}
          </div>
        </article>
      </section>

      <section className="home-page__cards">
        <article className="home-page__card">
          <h2>For customers</h2>
          <p>Browse featured titles, compare categories, and keep favorite books close.</p>
        </article>
        <article className="home-page__card">
          <h2>For store owners</h2>
          <p>Keep inventory readable, review ratings, and prepare catalog updates quickly.</p>
        </article>
        <article className="home-page__card">
          <h2>Account security</h2>
          <p>Refresh your password regularly and avoid reusing the same one.</p>
          <Link className="home-page__link" to="/auth/change-password">
            Change password
          </Link>
        </article>
      </section>
    </div>
  );
};
