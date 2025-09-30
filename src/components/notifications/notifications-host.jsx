import { useEffect, useMemo, useState } from 'react';
import {
  removeNotification,
  subscribeToNotifications
} from '../../services/notification-service';

const typeToClassesMap = {
  info: 'bg-white text-gray-900 border border-gray-200',
  success: 'bg-green-50 text-green-900 border border-green-200',
  error: 'bg-red-50 text-red-900 border border-red-200',
  warning: 'bg-yellow-50 text-yellow-900 border border-yellow-200'
};

export default function NotificationsHost() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications(setNotifications);
    return unsubscribe;
  }, []);

  const hasNotifications = notifications.length > 0;

  const items = useMemo(
    () =>
      notifications.map((notification) => ({
        ...notification,
        className: typeToClassesMap[notification.type] ?? typeToClassesMap.info
      })),
    [notifications]
  );

  if (!hasNotifications) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] flex flex-col items-end gap-2 overflow-hidden p-4">
      {items.map((notification) => (
        <div
          key={notification.id}
          className={`pointer-events-auto flex min-w-[240px] max-w-sm items-start justify-between gap-4 rounded-lg p-4 shadow ${notification.className}`}
        >
          <span className="flex-1 text-sm leading-5">{notification.message}</span>
          <button
            type="button"
            className="text-sm font-semibold text-gray-500 transition hover:text-gray-700"
            onClick={() => removeNotification(notification.id)}
            aria-label="Закрыть уведомление"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
