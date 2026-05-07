import { Link } from "react-router-dom";

import "@/assets/layouts-styles/home-styles/home.css";

export const HomeView = () => {
  return (
    <div className="home-page">
      <section className="home-page__hero">
        <p className="home-page__eyebrow">BookApp dashboard</p>
        <h1 className="home-page__title">Organize your reading in one place</h1>
        <p className="home-page__subtitle">
          Track books, filter by category, and quickly jump back to what matters most today.
        </p>
      </section>

      <section className="home-page__cards">
        <article className="home-page__card">
          <h2>Plan your week</h2>
          <p>Start with 2-3 priority titles and keep your list focused on realistic goals.</p>
        </article>
        <article className="home-page__card">
          <h2>Keep your library clean</h2>
          <p>Remove books you finished and tag new ones as soon as you add them.</p>
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
