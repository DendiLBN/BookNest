import { type FC, type FormEvent, useContext } from "react";

import { ThemeContext } from "@/common/contexts/theme-context";

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const footerStats = [
  { label: "Catalog", value: "100+" },
  { label: "Shelves", value: "12" },
  { label: "Secure auth", value: "JWT" },
];

export const LandingPageFooter: FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="app-layout-surface border-t">
      <div className="mx-auto grid w-full max-w-[var(--content-max-width)] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <section
          aria-label="BookNest footer summary"
          className="rounded-lg border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-surface-muted),var(--color-surface))] p-5 shadow-[var(--shadow-s)]"
        >
          <p className="m-0 text-sm font-semibold tracking-normal text-[var(--color-brand)] uppercase">
            BookNest
          </p>
          <h2 className="m-0 max-w-[420px] text-2xl leading-tight font-bold">
            Build your shelf, track favorites, and keep reading organized.
          </h2>
          <p className="app-muted-text m-0 max-w-[520px] text-sm leading-6">
            A practical bookstore dashboard for browsing books, managing your account, and keeping
            personal reading picks close.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {footerStats.map((stat) => (
              <div
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
                key={stat.label}
              >
                <strong className="block text-base text-[var(--color-brand)]">{stat.value}</strong>
                <span className="app-muted-text text-xs">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-label="BookNest newsletter and navigation"
          className="flex flex-col justify-between gap-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-s)]"
        >
          <div>
            <p className="m-0 text-sm font-semibold text-[var(--color-text)]">Stay in the loop</p>
            <p className="app-muted-text mt-1 mb-4 text-sm">
              Get catalog notes and account updates in one place.
            </p>
          </div>

          <form className="flex w-full flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="footer-newsletter-email">
              Newsletter email
            </label>
            <input
              className="min-h-11 flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20"
              id="footer-newsletter-email"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="min-h-11 rounded-md bg-[var(--color-brand)] px-5 text-sm font-semibold text-[var(--color-text-inverse)] transition hover:bg-[var(--color-brand-strong)] focus:ring-2 focus:ring-[var(--color-brand)]/30 focus:outline-none"
              type="submit"
            >
              Subscribe
            </button>
          </form>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--color-border)] pt-5"
          >
            {footerLinks.map(({ href, label }) => (
              <a
                className="app-muted-text text-sm font-medium transition hover:text-[var(--color-brand)]"
                href={href}
                key={href}
              >
                {label}
              </a>
            ))}
          </nav>
        </section>
      </div>

      <div className="app-muted-text mx-auto flex w-full max-w-[var(--content-max-width)] flex-col gap-2 border-t border-[var(--color-border)] px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>Copyright 2024 BookNest. All rights reserved.</span>
        <span>Designed for readers and bookstore workflows.</span>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
