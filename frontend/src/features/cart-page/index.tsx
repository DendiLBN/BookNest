import { Empty } from "antd";

import { CartItemCard } from "@/features/cart-page/components/cart-item-card";
import { CartSummary } from "@/features/cart-page/components/cart-summary";
import { CheckoutAddressForm } from "@/features/cart-page/components/checkout-address-form";

import { useCartMutations } from "@/features/cart-page/hooks/useCartMutations";
import { useCartSummary } from "@/features/cart-page/hooks/useCartSummary";
import { useCheckout } from "@/features/cart-page/hooks/useCheckout";

type TCartViewProps = {
  compact?: boolean;
};

export const CartView = ({ compact = false }: TCartViewProps) => {
  const { handleRemoveItem, handleUpdateQuantity } = useCartMutations();
  const { resolvedCartItems, totalPriceCents } = useCartSummary();
  const { handleCheckout, isCreatingOrder } = useCheckout();

  if (resolvedCartItems.length === 0) {
    return (
      <section className="rounded-l border border-app-border bg-app-surface p-l shadow-app-s">
        <Empty description="Your cart is empty." />
      </section>
    );
  }

  return (
    <div className="cart-surface flex flex-col gap-s">
      {resolvedCartItems.map((cartItem) => (
        <CartItemCard
          cartItem={cartItem}
          compact={compact}
          key={cartItem.bookId}
          onRemove={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
        />
      ))}
      {!compact && (
        <>
          <CartSummary totalPriceCents={totalPriceCents} />
          <CheckoutAddressForm isSubmitting={isCreatingOrder} onSubmit={handleCheckout} />
        </>
      )}
    </div>
  );
};
