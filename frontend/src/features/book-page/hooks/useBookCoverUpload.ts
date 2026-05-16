import { useRef } from "react";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { useUploadBookCoverMutation } from "@/store/api/books";

const allowedCoverTypes = ["image/jpeg", "image/png", "image/webp"];
const maxCoverSizeInBytes = 2 * 1024 * 1024;

export const useBookCoverUpload = (bookId: string) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { openNotification } = useNotificationContext();
  const [uploadBookCover, { isLoading: isUploadingCover }] = useUploadBookCoverMutation();

  const openCoverPicker = () => {
    fileInputRef.current?.click();
  };

  const handleCoverChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!allowedCoverTypes.includes(file.type)) {
      openNotification("topRight", "error", "Cover must be a JPG, PNG, or WEBP image.", false);
      return;
    }

    if (file.size > maxCoverSizeInBytes) {
      openNotification("topRight", "error", "Cover must be 2 MB or smaller.", false);
      return;
    }

    const data = new FormData();
    data.append("cover", file);

    try {
      await uploadBookCover({ bookId, data }).unwrap();
      openNotification("topRight", "success", "Book cover updated.", false);
    } catch {
      openNotification("topRight", "error", "Could not update book cover.", false);
    } finally {
      event.target.value = "";
    }
  };

  return {
    fileInputRef,
    handleCoverChange,
    isUploadingCover,
    openCoverPicker,
  };
};
