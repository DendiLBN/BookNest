import React, { createContext, Dispatch, FC, Key, SetStateAction, useMemo, useState } from "react";

export type TBookFormContext = {
  bookSearchText: string;
  maxPriceCents?: number;
  minPriceCents?: number;
  selectedBookRowKeys: Key[];
  selectedCategories: string[];
  sortBy?: "priceAsc" | "priceDesc";
  setBookSearchText: Dispatch<SetStateAction<string>>;
  setMaxPriceCents: Dispatch<SetStateAction<number | undefined>>;
  setMinPriceCents: Dispatch<SetStateAction<number | undefined>>;
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  setSelectedBookRowKeys: Dispatch<SetStateAction<Key[]>>;
  setSortBy: Dispatch<SetStateAction<"priceAsc" | "priceDesc" | undefined>>;
};

export const BookFormContext = createContext<TBookFormContext | undefined>(undefined);

export const BookFormContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookSearchText, setBookSearchText] = useState<string>("");
  const [maxPriceCents, setMaxPriceCents] = useState<number | undefined>();
  const [minPriceCents, setMinPriceCents] = useState<number | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBookRowKeys, setSelectedBookRowKeys] = useState<Key[]>([]);
  const [sortBy, setSortBy] = useState<"priceAsc" | "priceDesc" | undefined>();

  const memoizedValue = useMemo(
    () => ({
      selectedBookRowKeys,
      bookSearchText,
      maxPriceCents,
      minPriceCents,
      selectedCategories,
      sortBy,
      setSelectedCategories,
      setBookSearchText,
      setMaxPriceCents,
      setMinPriceCents,
      setSelectedBookRowKeys,
      setSortBy,
    }),
    [bookSearchText, maxPriceCents, minPriceCents, selectedBookRowKeys, selectedCategories, sortBy],
  );

  return <BookFormContext.Provider value={memoizedValue}>{children}</BookFormContext.Provider>;
};
