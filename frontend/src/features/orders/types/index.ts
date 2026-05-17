export type TOrderItem = {
  bookId: string;
  title: string;
  author: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
  coverImageUrl?: string;
};

export type TOrder = {
  _id: string;
  items: TOrderItem[];
  totalPriceCents: number;
  status: "cancelled" | "completed" | "paid" | "pending";
  createdAt: string;
};
