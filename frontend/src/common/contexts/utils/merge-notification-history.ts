import type { TNotificationHistoryItem } from "@/common/contexts/antd-notification-context";

import { MAX_NOTIFICATION_HISTORY_ITEMS } from "@/common/consts/notifications";

type TMergeNotificationHistoryParams = {
  currentNotifications: TNotificationHistoryItem[];
  notificationHistoryItem: TNotificationHistoryItem;
};

export const mergeNotificationHistory = ({
  currentNotifications,
  notificationHistoryItem,
}: TMergeNotificationHistoryParams) => {
  const latestMatchingNotification = currentNotifications.find(
    (currentNotification) =>
      currentNotification.message === notificationHistoryItem.message &&
      currentNotification.type === notificationHistoryItem.type,
  );

  if (latestMatchingNotification) {
    return currentNotifications.map((currentNotification) =>
      currentNotification.id === latestMatchingNotification.id
        ? {
            ...currentNotification,
            count: currentNotification.count + 1,
            createdAt: notificationHistoryItem.createdAt,
            read: false,
          }
        : currentNotification,
    );
  }

  return [
    notificationHistoryItem,
    ...currentNotifications.slice(0, MAX_NOTIFICATION_HISTORY_ITEMS - 1),
  ];
};
