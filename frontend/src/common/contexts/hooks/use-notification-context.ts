import { useContext } from "react";

import {
  AntdNotificationContext,
  TNotificationContext,
} from "@/common/contexts/antd-notification-context";

export const useNotificationContext = (): TNotificationContext => {
  const ctx = useContext(AntdNotificationContext);
  if (ctx === undefined) {
    throw new Error("useNotificationContext must be used within an NotificationContextProvider");
  }

  return ctx;
};
