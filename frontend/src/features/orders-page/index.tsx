import { Empty, Spin } from "antd";

import { formatPrice } from "@/common/utils/format-price";
import { ORDER_STATUS_LABELS } from "@/features/orders/consts/order-status";
import { useFetchMyOrdersQuery } from "@/store/api/orders";

export const OrdersView = () => {
  const { data: orders = [], isLoading } = useFetchMyOrdersQuery();

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (orders.length === 0) {
    return (
      <section className="rounded-l border border-app-border bg-app-surface p-l shadow-app-s">
        <Empty description="You have no orders yet." />
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-s">
      {orders.map((order) => (
        <article
          className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s"
          key={order._id}
        >
          <div className="mb-xs flex items-center justify-between gap-xs">
            <strong className="text-app-text">Order {order._id.slice(-6)}</strong>
            <span className="rounded-m bg-app-surface-muted px-xs py-1 text-sm text-app-text-muted">
              {ORDER_STATUS_LABELS[order.status]}
            </span>
          </div>
          <p className="mt-0 mb-s text-sm text-app-text-muted">
            Placed {new Date(order.createdAt).toLocaleDateString("pl-PL")}
          </p>
          <div className="flex flex-col gap-xs">
            {order.items.map((item) => (
              <div className="flex items-center justify-between gap-xs" key={item.bookId}>
                <span className="text-app-text">
                  {item.title} x {item.quantity}
                </span>
                <span className="font-semibold text-app-accent">
                  {formatPrice(item.lineTotalCents)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-s border-t border-app-border pt-xs text-right font-bold text-app-text">
            Total: {formatPrice(order.totalPriceCents)}
          </div>
        </article>
      ))}
    </div>
  );
};
