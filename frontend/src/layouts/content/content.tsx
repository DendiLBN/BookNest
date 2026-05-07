import { Layout } from "antd";

import "@/assets/global-styles/content.css";

import { LandingPageRouting } from "@/routes/routing";

const { Content } = Layout;

export const LandingPageContent = () => {
  return (
    <>
      <Content className="landing__page-content">
        <LandingPageRouting />
      </Content>
    </>
  );
};
