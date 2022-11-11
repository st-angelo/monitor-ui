import { NotificationProps, showNotification } from '@mantine/notifications';

export const showInfo = ({ message, ...rest }: NotificationProps) =>
  showNotification({
    title: 'Info',
    color: 'cyan',
    message,
    ...rest,
  });

export const showSuccess = ({ message, ...rest }: NotificationProps) =>
  showNotification({
    title: 'Success',
    color: 'teal',
    message,
    ...rest,
  });

export const showWarning = ({ message, ...rest }: NotificationProps) =>
  showNotification({
    title: 'Warning',
    color: 'yellow',
    message,
    ...rest,
  });

export const showError = ({ message, ...rest }: NotificationProps) =>
  showNotification({
    title: 'Error',
    color: 'red',
    message,
    ...rest,
  });
