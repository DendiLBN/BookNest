import type { Key } from "react";

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
