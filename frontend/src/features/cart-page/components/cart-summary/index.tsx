import { formatPrice } from "@/common/utils/format-price";

type TCartSummaryProps = {
  totalPriceCents: number;
};

export const CartSummary = ({ totalPriceCents }: TCartSummaryProps) => (
  <section className="flex flex-col gap-xs rounded-l border border-app-border bg-app-surface p-s shadow-app-s sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="m-0 text-sm text-app-text-muted">Order total</p>
      <strong className="text-xl text-app-text">{formatPrice(totalPriceCents)}</strong>
    </div>
  </section>
);
