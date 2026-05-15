import { BrowserRouter } from "react-router-dom";

import { AntdNotificationProvider } from "@/common/contexts/antd-notification-context";
import { ModalProvider } from "@/common/contexts/modal-context";
import { ThemeProvider } from "@/common/contexts/theme-context";

import ErrorBoundary from "@/common/error-boundary/error-boundry";
import { LandingPageContent } from "@/layouts/content/content";
import LandingPageFooter from "@/layouts/footer/footer";
import { LandingPageHeader } from "@/layouts/header/header";
import { LandingPageSideBar } from "@/layouts/side-bar/sidebar";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AntdNotificationProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <div className="min-h-screen bg-app-page text-app-text">
                <LandingPageHeader />
                <div className="flex min-h-[calc(100vh-64px)] w-full items-stretch">
                  <LandingPageSideBar />
                  <LandingPageContent />
                </div>
                <LandingPageFooter />
              </div>
            </ErrorBoundary>
          </BrowserRouter>
        </AntdNotificationProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};
export default App;
