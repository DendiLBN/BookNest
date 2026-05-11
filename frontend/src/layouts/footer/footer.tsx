import { FC, useContext } from "react";

import { Button, Input, Layout, Space } from "antd";

import { ThemeContext } from "@/common/contexts/theme-context";

const { Footer } = Layout;

export const LandingPageFooter: FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return;
  }

  const { isDarkMode } = themeContext;

  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: isDarkMode ? "#2b2b3c" : "#ffffff",
        color: isDarkMode ? "#e0e0e0" : "#333333",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <h3>Subscribe to our Newsletter</h3>
        <Space.Compact style={{ maxWidth: "400px", margin: "0 auto" }}>
          <Input style={{ width: "70%" }} placeholder="Enter your email" />
          <Button type="primary" style={{ width: "30%" }}>
            Subscribe
          </Button>
        </Space.Compact>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <a
          href="/about"
          style={{
            marginRight: "15px",
            color: isDarkMode ? "#e0e0e0" : "#333333",
          }}
        >
          About Us
        </a>
        <a
          href="/contact"
          style={{
            marginRight: "15px",
            color: isDarkMode ? "#e0e0e0" : "#333333",
          }}
        >
          Contact
        </a>
        <a
          href="/terms"
          style={{
            marginRight: "15px",
            color: isDarkMode ? "#e0e0e0" : "#333333",
          }}
        >
          Terms of Service
        </a>
        <a href="/privacy" style={{ color: isDarkMode ? "#e0e0e0" : "#333333" }}>
          Privacy Policy
        </a>
      </div>
      <div style={{ marginTop: "20px", color: "#888" }}>© 2024 BookNest. All rights reserved.</div>
    </Footer>
  );
};

export default LandingPageFooter;
