import type { IconType } from "antd/es/notification/interface";

import type { TNotificationHistoryItem } from "@/common/contexts/antd-notification-context";

type TCreateNotificationHistoryItemParams = {
  message: string;
  type: IconType;
};

export const createNotificationHistoryItem = ({
  message,
  type,
}: TCreateNotificationHistoryItemParams): TNotificationHistoryItem => ({
  id: `${Date.now()}-${message}`,
  message,
  type,
  createdAt: new Date().toLocaleString(),
  read: false,
  count: 1,
});
