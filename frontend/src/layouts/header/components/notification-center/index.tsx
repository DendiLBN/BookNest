import { useState } from "react";

import { BellOutlined, DeleteOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Empty, List, Tag } from "antd";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

const notificationTypeColor = {
  error: "red",
  info: "blue",
  success: "green",
  warning: "gold",
} as const;

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearNotifications, markNotificationsAsRead, notifications, unreadNotificationsCount } =
    useNotificationContext();

  const handleOpen = () => {
    setIsOpen(true);
    markNotificationsAsRead();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Badge count={unreadNotificationsCount} size="small">
        <Button
          aria-label="Open notifications"
          icon={<BellOutlined />}
          onClick={handleOpen}
          shape="circle"
          type="text"
        />
      </Badge>

      <Drawer
        extra={
          <Button
            disabled={notifications.length === 0}
            icon={<DeleteOutlined />}
            onClick={clearNotifications}
            type="text"
          />
        }
        onClose={handleClose}
        open={isOpen}
        title="Notifications"
        width={360}
      >
        {notifications.length > 0 ? (
          <List
            dataSource={notifications}
            renderItem={(notificationItem) => (
              <List.Item>
                <List.Item.Meta
                  description={notificationItem.createdAt}
                  title={
                    <div className="flex items-start justify-between gap-3">
                      <span>{notificationItem.message}</span>
                      <Tag color={notificationTypeColor[notificationItem.type]}>
                        {notificationItem.type}
                      </Tag>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty description="No notifications yet." />
        )}
      </Drawer>
    </>
  );
};
