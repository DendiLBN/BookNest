import { MenuProps } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  BookOutlined,
  BellOutlined,
  HeartFilled,
  BookFilled,
  LockOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

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
