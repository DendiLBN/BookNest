import { Link } from "react-router-dom";

import { HomeOutlined, SnippetsFilled, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

export const homeMenuItem: MenuProps["items"] = [
  {
    key: "home",
    label: <Link to="/home">Home</Link>,
    icon: <HomeOutlined />,
  },
];

export const leftMenuItems: MenuProps["items"] = [
  {
    key: "bookList",
    label: <Link to="/book">Books</Link>,
    icon: <SnippetsFilled />,
  },
];

export const rightMenuItems: MenuProps["items"] = [
  {
    key: "account-login",
    label: <Link to="/auth/login">Sign In</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "account-register",
    label: <Link to="/auth/register">Register</Link>,
    icon: <UserOutlined />,
  },
];
