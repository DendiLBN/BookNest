import { Select, Spin } from "antd";

import { formatPrice } from "@/common/utils/format-price";
import { ORDER_STATUS_LABELS } from "@/features/orders/consts/order-status";
import type { TOrder } from "@/features/orders/types";
import { useFetchOrdersQuery, useUpdateOrderStatusMutation } from "@/store/api/orders";

const orderStatusOptions = Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({
  label,
  value,
}));

export const OrdersAdminView = () => {
  const { data: orders = [], isLoading } = useFetchOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className="flex flex-col gap-s">
      {orders.map((order) => (
        <article
          className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s"
          key={order._id}
        >
          <div className="flex flex-col gap-xs md:flex-row md:items-center md:justify-between">
            <div>
              <strong className="text-app-text">Order {order._id.slice(-6)}</strong>
              <p className="m-0 text-sm text-app-text-muted">
                {order.shippingAddress.recipientName}, {order.shippingAddress.street},{" "}
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
            </div>
            <Select
              className="min-w-36"
              onChange={(status: TOrder["status"]) =>
                updateOrderStatus({ orderId: order._id, status })
              }
              options={orderStatusOptions}
              value={order.status}
            />
          </div>
          <div className="mt-s flex items-center justify-between border-t border-app-border pt-xs">
            <span className="text-app-text-muted">{order.items.length} items</span>
            <strong className="text-app-text">{formatPrice(order.totalPriceCents)}</strong>
          </div>
        </article>
      ))}
    </div>
  );
};
