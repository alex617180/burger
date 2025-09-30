import createEventEmitter from '../utils/event-emitter';

const emitter = createEventEmitter();
let notifications = [];
const timers = new Map();

const notify = () => emitter.emit(notifications);

export const subscribeToNotifications = (listener) => {
  listener(notifications);
  return emitter.subscribe(listener);
};

export const removeNotification = (id) => {
  if (timers.has(id)) {
    clearTimeout(timers.get(id));
    timers.delete(id);
  }
  notifications = notifications.filter((notification) => notification.id !== id);
  notify();
};

export const pushNotification = ({ id, message, type = 'info', ttl = 3000 }) => {
  const notificationId = id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  if (timers.has(notificationId)) {
    clearTimeout(timers.get(notificationId));
    timers.delete(notificationId);
  }

  const nextNotification = {
    id: notificationId,
    message,
    type
  };

  notifications = [
    ...notifications.filter((notification) => notification.id !== notificationId),
    nextNotification
  ];
  notify();

  if (ttl) {
    const timeoutId = setTimeout(() => {
      removeNotification(notificationId);
    }, ttl);

    timers.set(notificationId, timeoutId);
  }

  return notificationId;
};

export const clearNotifications = () => {
  timers.forEach((timerId) => clearTimeout(timerId));
  timers.clear();
  notifications = [];
  notify();
};
