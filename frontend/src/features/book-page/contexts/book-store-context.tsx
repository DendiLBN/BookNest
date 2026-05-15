import React, { createContext, Dispatch, FC, Key, SetStateAction, useMemo, useState } from "react";

export type TBookFormContext = {
  bookSearchText: string;
  selectedBookRowKeys: Key[];
  selectedCategories: string[];
  setBookSearchText: Dispatch<SetStateAction<string>>;
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  setSelectedBookRowKeys: Dispatch<SetStateAction<Key[]>>;
};

export const BookFormContext = createContext<TBookFormContext | undefined>(undefined);

export const BookFormContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookSearchText, setBookSearchText] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBookRowKeys, setSelectedBookRowKeys] = useState<Key[]>([]);

  const memoizedValue = useMemo(
    () => ({
      selectedBookRowKeys,
      bookSearchText,
      selectedCategories,
      setSelectedCategories,
      setBookSearchText,
      setSelectedBookRowKeys,
    }),
    [selectedBookRowKeys, bookSearchText, selectedCategories],
  );

  return <BookFormContext.Provider value={memoizedValue}>{children}</BookFormContext.Provider>;
};
