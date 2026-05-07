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

export type TNotificationContext = {
  loading: boolean;
  error: string | null;
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

  const openNotification = useCallback(
    (placement: NotificationPlacement, type: IconType, message: string, pauseOnHover: boolean) => {
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
      error,
      loading,
      openNotification,
      setLoading,
      setError,
    }),
    [error, loading, openNotification, setLoading],
  );

  return (
    <AntdNotificationContext.Provider value={memoizedValue}>
      {contextHolder}
      {children}
    </AntdNotificationContext.Provider>
  );
};
