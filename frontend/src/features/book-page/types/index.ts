import type { Key } from "react";

export type TBooksQueryParams = {
  page: number;
  perPage: number;
  searchString: string;
  category: string[];
};

export type TBook = {
  _id: string;
  category: string[];
  key: string;
  title: string;
  rate: number;
  author: string;
  priceCents: number;
  tags: string[];
  avatar?: string;
  coverImageUrl?: string;
};

export type TPaginatedBooksResponse = {
  data: TBook[];
  page: number;
  perPage: number;
  totalItems: number;
};

export type TBookDashboardSummary = {
  totalBooks: number;
  totalCategories: number;
  averageRating: number;
};

export type TDeleteBooksButtonProps = {
  selectedBookRowKeys: Key[];
  loading: boolean;
  onDelete: () => void;
};

export type TCategorySelectProps = {
  selectedCategories: string[];
  onChangeCategories: (select: string[]) => void;
};

export type TBookSearchProps = {
  bookSearchText: string;
  onSearch: (value: string) => void;
};
