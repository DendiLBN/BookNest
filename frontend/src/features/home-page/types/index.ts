import type { TBook } from "@/features/book-page/types";

export type TDashboardStat = {
  label: string;
  value: number | string;
  helper: string;
};

export type TFeaturedShelvesProps = {
  books: TBook[];
  hasBooks: boolean;
};

export type TActiveShelvesProps = {
  categories: Array<[string, number]>;
};

export type THomeDashboardState = {
  catalogStatus: string;
  dashboardStats: TDashboardStat[];
  featuredBooks: TBook[];
  topCategories: Array<[string, number]>;
  hasBooks: boolean;
  isError: boolean;
  isLoading: boolean;
};
