import { useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { useSelector } from "react-redux";

import "@/assets/layouts-styles/sidebar.css";

import { useThemeContext } from "@/common/contexts/hooks/use-theme-context";

import useUser from "@/common/users/useUser";
import { itemsSideBar } from "@/layouts/side-bar/consts/items-side-bar";
import { selectIsLoggedIn } from "@/store/reducers/auth";

const { Sider } = Layout;

export const LandingPageSideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { user } = useUser();

  const themeContext = useThemeContext();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  if (!user || !themeContext) {
    return null;
  }

  const { isDarkMode } = themeContext;

  return (
    isLoggedIn && (
      <Sider
        className="landing__page-sidebar"
        theme="light"
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        width={200}
        trigger={true}
      >
        <div style={{ textAlign: "center", padding: "5px", marginTop: "15px" }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <h3
            style={{
              marginTop: "20px",
              color: isDarkMode ? "#e0e0e0" : "#333333",
            }}
          >
            {user.firstName}
          </h3>
        </div>
        <Menu
          mode="inline"
          style={{ borderInlineEnd: "none" }}
          theme="light"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={itemsSideBar}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div onClick={toggleCollapsed} style={{ cursor: "pointer" }}>
            {collapsed ? "▶" : "◁"}
          </div>
        </div>
      </Sider>
    )
  );
};
