import { Link } from "react-router-dom";

import {
  AppstoreOutlined,
  BookOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import useUser from "@/common/users/useUser";

const quickActions = [
  {
    label: "Manage catalog",
    icon: <BookOutlined />,
  },
  {
    label: "Prepare new title",
    icon: <PlusCircleOutlined />,
  },
  {
    label: "Review baskets",
    icon: <ShoppingCartOutlined />,
  },
];

export const QuickActions = () => <QuickActionsContent />;

const QuickActionsContent = () => {
  const { user } = useUser();
  const visibleQuickActions = quickActions.filter(
    (action) => action.label !== "Prepare new title" || user?.role === "admin",
  );

  return (
    <article className="rounded-l border border-app-border bg-app-surface p-4.5 shadow-app-s">
      <div className="mb-s flex items-start justify-between gap-xs">
        <div>
          <p className="m-0 text-xs font-bold text-app-text-muted uppercase">Inventory</p>
          <h2 className="mt-1 mb-0 text-lg font-bold text-app-text">Quick actions</h2>
        </div>
        <AppstoreOutlined className="text-xl text-app-accent" />
      </div>
      <div className="flex flex-col gap-xs">
        {visibleQuickActions.map((action) => (
          <Link
            className="flex items-center gap-xs rounded-m bg-app-surface-muted px-xs py-xs font-bold text-app-text no-underline transition hover:bg-app-accent-soft hover:text-app-accent"
            key={action.label}
            to="/book"
          >
            {action.icon}
            {action.label}
          </Link>
        ))}
      </div>
    </article>
  );
};
