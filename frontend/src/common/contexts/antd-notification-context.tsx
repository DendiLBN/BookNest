import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { notification } from "antd";
import { IconType, NotificationPlacement } from "antd/es/notification/interface";

export type TNotificationHistoryItem = {
  id: string;
  message: string;
  type: IconType;
  createdAt: string;
  read: boolean;
  count: number;
};

export type TNotificationContext = {
  loading: boolean;
  error: string | null;
  notifications: TNotificationHistoryItem[];
  unreadNotificationsCount: number;
  clearNotifications: () => void;
  markNotificationsAsRead: () => void;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  openNotification: (
    placement: NotificationPlacement,
    type: IconType,
    message: string,
    pauseOnHover: boolean,
  ) => void;
};

export const AntdNotificationContext = createContext<TNotificationContext | undefined>(undefined);

export const AntdNotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<TNotificationHistoryItem[]>([]);

  const markNotificationsAsRead = useCallback(() => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((currentNotification) => ({
        ...currentNotification,
        read: true,
      })),
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const openNotification = useCallback(
    (placement: NotificationPlacement, type: IconType, message: string, pauseOnHover: boolean) => {
      const notificationHistoryItem: TNotificationHistoryItem = {
        id: `${Date.now()}-${message}`,
        message,
        type,
        createdAt: new Date().toLocaleString(),
        read: false,
        count: 1,
      };

      setNotifications((currentNotifications) => {
        const latestMatchingNotification = currentNotifications.find(
          (currentNotification) =>
            currentNotification.message === message && currentNotification.type === type,
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

        return [notificationHistoryItem, ...currentNotifications.slice(0, 19)];
      });

      if (isNotificationOpen) {
        return;
      }
      setIsNotificationOpen(true);

      api.open({
        type,
        message,
        placement,
        showProgress: true,
        pauseOnHover,
        onClick: () => {
          setIsNotificationOpen(false);
        },
        onClose: () => {
          setIsNotificationOpen(false);
        },
      });

      setTimeout(() => {
        setIsNotificationOpen(false);
      }, 3000);
    },
    [isNotificationOpen, api],
  );

  const memoizedValue = useMemo(
    () => ({
      clearNotifications,
      error,
      loading,
      markNotificationsAsRead,
      notifications,
      openNotification,
      unreadNotificationsCount: notifications.filter(
        (currentNotification) => !currentNotification.read,
      ).length,
      setLoading,
      setError,
    }),
    [
      clearNotifications,
      error,
      loading,
      markNotificationsAsRead,
      notifications,
      openNotification,
      setLoading,
    ],
  );

  return (
    <AntdNotificationContext.Provider value={memoizedValue}>
      {contextHolder}
      {children}
    </AntdNotificationContext.Provider>
  );
};
