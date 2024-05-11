import { ReactNode, useContext } from "react";
import MainNavigation from "./MainNavigation";
import Notification from "../ui/Notification";
import NotificationContext from "@/store/notification-context";

export default function RootLayout({ children }: { children: ReactNode }) {
  const notificationCtx = useContext(NotificationContext);

  return (
    <>
      <MainNavigation />
      <main>{children}</main>
      {notificationCtx.notification && (
        <Notification
          title={notificationCtx.notification.title}
          message={notificationCtx.notification.message}
          status={notificationCtx.notification.status}
        />
      )}
    </>
  );
}
