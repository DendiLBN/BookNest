import { Link } from "react-router-dom";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer } from "antd";

import { useCartDrawerContext } from "@/common/contexts/hooks/use-cart-drawer-context";

import useUser from "@/common/users/useUser";
import { CartView } from "@/features/cart-page";

export const CartDrawer = () => {
  const { user } = useUser();
  const { closeCartDrawer, isCartDrawerOpen, openCartDrawer } = useCartDrawerContext();
  const cartItemsCount = user?.cartItems.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <>
      <Badge count={cartItemsCount} size="small">
        <Button
          aria-label="Open cart"
          className="min-h-10 min-w-10 border border-app-border bg-app-surface text-app-text shadow-sm hover:border-app-brand hover:text-app-brand"
          icon={<ShoppingCartOutlined />}
          onClick={openCartDrawer}
          shape="circle"
          type="text"
        />
      </Badge>

      <Drawer
        extra={
          <Link className="font-semibold text-app-accent no-underline hover:underline" to="/cart">
            Open full cart
          </Link>
        }
        onClose={closeCartDrawer}
        open={isCartDrawerOpen}
        title="Cart"
        width={420}
      >
        <CartView compact />
      </Drawer>
    </>
  );
};
