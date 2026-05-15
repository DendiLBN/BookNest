import type { Key } from "react";

import type { TableProps } from "antd";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import type { TBookBody } from "@/types/types";

const MAX_SELECTED_BOOKS = 20;

type TUseBookSelectionParams = {
  selectedBookRowKeys: Key[];
  setSelectedBookRowKeys: (selectedBookRowKeys: Key[]) => void;
};

export const useBookSelection = ({
  selectedBookRowKeys,
  setSelectedBookRowKeys,
}: TUseBookSelectionParams) => {
  const { openNotification } = useNotificationContext();

  const handleSelectChange = (newSelectedRowKeys: Key[]) => {
    if (newSelectedRowKeys.length <= MAX_SELECTED_BOOKS) {
      setSelectedBookRowKeys(newSelectedRowKeys);
      return;
    }

    openNotification(
      "topRight",
      "error",
      `An error occurred while selecting books. You can select up to ${MAX_SELECTED_BOOKS} books.`,
      true,
    );
  };

  const rowSelection: TableProps<TBookBody>["rowSelection"] = {
    selectedRowKeys: selectedBookRowKeys,
    onChange: handleSelectChange,
  };

  return {
    rowSelection,
  };
};
