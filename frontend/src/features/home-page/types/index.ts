import type { TBook } from "@/features/book-page/types";

export type TDashboardStat = {
  label: string;
  value: number | string;
  helper: string;
};

export type TFeaturedShelvesProps = {
  books: TBook[];
};

export type TActiveShelvesProps = {
  categories: Array<[string, number]>;
};
