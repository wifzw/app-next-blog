import { NotificationStatus } from "@/components/ui/Notification";
import { ReactNode, createContext, useEffect, useState } from "react";

interface INotification {
  title: string;
  message: string;
  status: NotificationStatus;
}

interface NotificationContextType {
  notification: INotification | null;
  showNotification: (notification: INotification) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  showNotification: (_: INotification) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeNotification, setActiveNotification] =
    useState<INotification | null>(null);

  useEffect(() => {
    if (activeNotification?.status !== "pending") {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: INotification) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context: NotificationContextType = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
