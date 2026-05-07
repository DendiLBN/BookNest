import { Link } from "react-router-dom";

import {
  BellOutlined,
  BookFilled,
  BookOutlined,
  HeartFilled,
  LockOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

export const itemsSideBar: MenuProps["items"] = [
  {
    key: "dashboard",
    icon: <BookOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "books",
    icon: <BookFilled />,
    label: <Link to="/book">Books</Link>,
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
    children: [
      {
        key: "order-history",
        style: { paddingLeft: "10px" },
        label: "Order History",
        icon: <BookFilled />,
        disabled: true,
      },

      {
        key: "favorites",
        style: { paddingLeft: "10px" },
        label: "Favorites",
        icon: <HeartFilled />,
        disabled: true,
      },
    ],
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Account Settings",
    children: [
      {
        key: "change-password",
        style: { paddingLeft: "10px" },
        label: <Link to="/auth/change-password">Change Password</Link>,
        icon: <LockOutlined />,
      },
      {
        key: "notifications",
        style: { paddingLeft: "10px" },
        label: "Notifications",
        icon: <BellOutlined />,
        disabled: true,
      },
    ],
  },
];
