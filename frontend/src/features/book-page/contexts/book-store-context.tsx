import React, { createContext, Dispatch, FC, Key, SetStateAction, useMemo, useState } from "react";

import { TBookBody } from "@/types/types";

export type TBookFormContext = {
  bookSearchText: string;
  isSidebarCollapsed: boolean;
  selectedBookRowKeys: Key[];
  fetchBookList: TBookBody[];
  bookList: TBookBody[];
  selectedCategories: string[];
  setBookSearchText: Dispatch<SetStateAction<string>>;
  setIsSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
  setFetchBookList: Dispatch<SetStateAction<TBookBody[]>>;
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  setBookList: Dispatch<SetStateAction<TBookBody[]>>;
  setSelectedBookRowKeys: Dispatch<SetStateAction<Key[]>>;
};

export const BookFormContext = createContext<TBookFormContext | undefined>(undefined);

export const BookFormContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookSearchText, setBookSearchText] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [bookList, setBookList] = useState<TBookBody[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [fetchBookList, setFetchBookList] = useState<TBookBody[]>([]);
  const [selectedBookRowKeys, setSelectedBookRowKeys] = useState<Key[]>([]);

  const memoizedValue = useMemo(
    () => ({
      selectedBookRowKeys,
      bookSearchText,
      selectedCategories,
      bookList,
      isSidebarCollapsed,
      fetchBookList,
      setSelectedCategories,
      setFetchBookList,
      setBookSearchText,
      setBookList,
      setIsSidebarCollapsed,
      setSelectedBookRowKeys,
    }),
    [
      selectedBookRowKeys,
      bookSearchText,
      selectedCategories,
      bookList,
      isSidebarCollapsed,
      fetchBookList,
    ],
  );

  return <BookFormContext.Provider value={memoizedValue}>{children}</BookFormContext.Provider>;
};
