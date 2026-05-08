import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import { useBooksFormContext } from "@/features/book-page/contexts/hooks/use-form-book-context";

import { useDeleteManyBooksMutation } from "@/features/book-page/api";

export const useDeleteAsArrayBooks = () => {
  const { setLoading, openNotification } = useNotificationContext();

  const { selectedBookRowKeys, setSelectedBookRowKeys } = useBooksFormContext();

  const [deleteBooks] = useDeleteManyBooksMutation();

  const handleOnSuccesDelete = () => {
    openNotification("topRight", "success", "Book delete successfully!.", false);
    setSelectedBookRowKeys([]);
  };

  const handleErrorDelete = () => {
    openNotification(
      "topRight",
      "error",
      "An error occurred while deleting books! Please try again.",
      false,
    );
  };

  const handleDeleteArray = async () => {
    if (!selectedBookRowKeys.length) return;
    setLoading(true);
    try {
      await deleteBooks(selectedBookRowKeys).unwrap();
      handleOnSuccesDelete();
    } catch {
      handleErrorDelete();
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDeleteArray,
  };
};
