import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useFilteredBooks } from "@/features/book-page/hooks/useFilteredBooks";

import { TBookBody } from "@/types/types";

const books: TBookBody[] = [
  {
    _id: "1",
    key: "1",
    title: "Dune",
    author: "Frank Herbert",
    category: ["Science Fiction"],
    rate: 5,
    tags: ["classic"],
    avatar: "dune.jpg",
  },
  {
    _id: "2",
    key: "2",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: ["Fantasy"],
    rate: 4,
    tags: ["adventure"],
    avatar: "hobbit.jpg",
  },
  {
    _id: "3",
    key: "3",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: ["Science"],
    rate: 3,
    tags: ["programming"],
    avatar: "clean-code.jpg",
  },
];

describe("useFilteredBooks", () => {
  it("filters books by title", () => {
    const setBookList = vi.fn();

    renderHook(() =>
      useFilteredBooks({
        bookSearchText: "dune",
        selectedCategories: [],
        fetchBookList: books,
        setBookList,
      }),
    );

    expect(setBookList).toHaveBeenCalledWith([books[0]]);
  });

  it("filters books by author", () => {
    const setBookList = vi.fn();

    renderHook(() =>
      useFilteredBooks({
        bookSearchText: "tolkien",
        selectedCategories: [],
        fetchBookList: books,
        setBookList,
      }),
    );

    expect(setBookList).toHaveBeenCalledWith([books[1]]);
  });

  it("filters books by category", () => {
    const setBookList = vi.fn();

    renderHook(() =>
      useFilteredBooks({
        bookSearchText: "",
        selectedCategories: ["Fantasy"],
        fetchBookList: books,
        setBookList,
      }),
    );

    expect(setBookList).toHaveBeenCalledWith([books[1]]);
  });

  it("combines search text and category filters", () => {
    const setBookList = vi.fn();

    renderHook(() =>
      useFilteredBooks({
        bookSearchText: "code",
        selectedCategories: ["Science"],
        fetchBookList: books,
        setBookList,
      }),
    );

    expect(setBookList).toHaveBeenCalledWith([books[2]]);
  });
});
