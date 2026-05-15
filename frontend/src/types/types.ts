import { Key } from "react";

export type TBookBody = {
  _id: string;
  category: string[];
  key: string;
  title: string;
  rate: number;
  author: string;
  tags: string[];
  avatar?: string;
  coverImageUrl?: string;
};

export type IBookSearchProps = {
  bookSearchText: string;
  value: string;
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
