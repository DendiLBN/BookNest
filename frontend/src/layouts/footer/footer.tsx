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

  const { isDarkMode } = themeContext;

  const surfaceClassName = isDarkMode
    ? "border-slate-700 bg-slate-950 text-slate-100"
    : "border-slate-200 bg-white text-slate-950";

  const mutedTextClassName = isDarkMode ? "text-slate-400" : "text-slate-600";
  const inputClassName = isDarkMode
    ? "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
    : "border-slate-300 bg-white text-slate-950 placeholder:text-slate-400";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className={`border-t ${surfaceClassName}`}>
      <div className="mx-auto grid w-full max-w-[1980px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <section aria-label="BookNest footer summary" className="flex flex-col gap-3">
          <p className="m-0 text-sm font-semibold tracking-normal text-emerald-600 uppercase">
            BookNest
          </p>
          <h2 className="m-0 max-w-[420px] text-2xl leading-tight font-bold">
            Build your shelf, track favorites, and keep reading organized.
          </h2>
          <p className={`m-0 max-w-[520px] text-sm leading-6 ${mutedTextClassName}`}>
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
              className={`min-h-11 flex-1 rounded-md border px-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 ${inputClassName}`}
              id="footer-newsletter-email"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="min-h-11 rounded-md bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:ring-2 focus:ring-emerald-600/30 focus:outline-none"
              type="submit"
            >
              Subscribe
            </button>
          </form>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
            {footerLinks.map(({ href, label }) => (
              <a
                className={`text-sm font-medium transition hover:text-emerald-600 ${mutedTextClassName}`}
                href={href}
                key={href}
              >
                {label}
              </a>
            ))}
          </nav>
        </section>
      </div>
      <div style={{ marginTop: "20px", color: "#888" }}>© 2024 BookNest. All rights reserved.</div>
    </Footer>
  );
};

export default LandingPageFooter;
