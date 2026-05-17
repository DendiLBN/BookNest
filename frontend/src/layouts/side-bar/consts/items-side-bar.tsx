import { Link } from "react-router-dom";

import {
  BookFilled,
  BookOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

import type { TUser } from "@/features/users/types";

export const createItemsSideBar = (user?: TUser): MenuProps["items"] => [
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
    key: "cart",
    icon: <ShoppingCartOutlined />,
    label: <Link to="/cart">Cart</Link>,
  },
  {
    key: "orders",
    icon: <ShoppingOutlined />,
    label: <Link to="/orders">Orders</Link>,
  },
  ...(user?.role === "admin"
    ? [
        {
          key: "admin-orders",
          icon: <ShoppingOutlined />,
          label: <Link to="/admin/orders">Admin orders</Link>,
        },
      ]
    : []),
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
