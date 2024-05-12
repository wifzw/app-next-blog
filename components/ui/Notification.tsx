import { useContext } from "react";

import classes from "./notification.module.css";
import NotificationContext from "@/store/notification-context";

export type NotificationStatus = "success" | "error" | "pending";

interface INotificationProps {
  title: string;
  message: string;
  status: NotificationStatus;
}

function Notification(props: INotificationProps) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div
      className={activeClasses}
      title="Remove Notificação"
      onClick={notificationCtx.hideNotification}
    >
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
