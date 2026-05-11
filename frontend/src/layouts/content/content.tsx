import { LandingPageRouting } from "@/routes/routing";

export const LandingPageContent = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] flex-1 overflow-x-hidden bg-[var(--color-page)]">
      <div className="mx-auto w-full max-w-[var(--content-max-width)] px-[var(--page-padding-x)] py-[var(--page-padding-y)]">
        <LandingPageRouting />
      </div>
    </main>
  );
};
