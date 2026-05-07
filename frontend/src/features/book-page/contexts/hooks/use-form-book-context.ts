import { useContext } from "react";

import {
  BookFormContext,
  TBookFormContext,
} from "@/features/book-page/contexts/book-store-context";

export const useBooksFormContext = (): TBookFormContext => {
  const ctx = useContext(BookFormContext);
  if (ctx === undefined) {
    throw new Error(" useBooksFormContext must be used within a BookFormContextProvider");
  }

  return ctx;
};
