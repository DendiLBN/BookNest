import { LandingPageRouting } from "@/routes/routing";

export const LandingPageContent = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] flex-1 overflow-x-hidden bg-app-page">
      <div className="mx-auto w-full max-w-content px-s py-l sm:px-sm md:py-xl lg:px-l lg:py-2xl 2xl:px-3xl 3xl:px-22">
        <LandingPageRouting />
      </div>
    </main>
  );
};
