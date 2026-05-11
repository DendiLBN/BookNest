import { type FC, type FormEvent, useContext } from "react";

import { ThemeContext } from "@/common/contexts/theme-context";

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
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
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="mx-auto grid w-full max-w-[1980px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <section aria-label="BookNest footer summary" className="flex flex-col gap-3">
          <p className="m-0 text-sm font-semibold tracking-normal text-[var(--color-brand)] uppercase">
            BookNest
          </p>
          <h2 className="m-0 max-w-[420px] text-2xl leading-tight font-bold">
            Build your shelf, track favorites, and keep reading organized.
          </h2>
          <p className="m-0 max-w-[520px] text-sm leading-6 text-[var(--color-text-muted)]">
            A practical bookstore dashboard for browsing books, managing your account, and keeping
            personal reading picks close.
          </p>
        </section>

        <section aria-label="BookNest newsletter and navigation" className="flex flex-col gap-6">
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

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
            {footerLinks.map(({ href, label }) => (
              <a
                className="text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-brand)]"
                href={href}
                key={href}
              >
                {label}
              </a>
            ))}
          </nav>
        </section>
      </div>

      <div className="mx-auto flex w-full max-w-[1980px] flex-col gap-2 border-t border-[var(--color-border)] px-4 py-4 text-xs text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>Copyright 2024 BookNest. All rights reserved.</span>
        <span>Designed for readers and bookstore workflows.</span>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
