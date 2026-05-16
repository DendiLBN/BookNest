import { Link } from "react-router-dom";

import { BookFilled, BookOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";
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
        key: "profile-overview",
        style: { paddingLeft: "10px" },
        label: <Link to="/profile">Overview</Link>,
        icon: <UserOutlined />,
      },

      {
        key: "favorites",
        style: { paddingLeft: "10px" },
        label: <Link to="/favorites">Favorites</Link>,
        icon: <HeartFilled />,
      },
    ],
  },
];
