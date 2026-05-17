import { useState } from "react";

import { DEFAULT_ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE } from "@/common/consts/pagination";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEMS_PER_PAGE);

  const handleChangePagination = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setItemsPerPage(Math.min(pageSize, MAX_ITEMS_PER_PAGE));
  };

  return {
    handleChangePagination,
    currentPage,
    itemsPerPage,
  };
};
