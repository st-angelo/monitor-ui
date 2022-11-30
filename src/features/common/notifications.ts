import { NotificationProps, showNotification } from '@mantine/notifications';
import i18n from 'i18next';

export const showInfo = ({ message, ...rest }: NotificationProps) =>
  showNotification({
    title: i18n.t('Notification.Info') as string,
    color: 'cyan',
    message,
    styles: _ => ({
      description: {
        whiteSpace: 'pre-wrap',
      },
    }),
    ...rest,
  });

export const showSuccess = ({ message, ...rest }: NotificationProps) =>
  showNotification({
    title: i18n.t('Notification.Success') as string,
    color: 'teal',
    message,
    styles: _ => ({
      description: {
        whiteSpace: 'pre-wrap',
      },
    }),
    ...rest,
  });

export const showWarning = ({ message, ...rest }: NotificationProps) =>
  showNotification({
    title: i18n.t('Notification.Warning') as string,
    color: 'yellow',
    message,
    styles: _ => ({
      description: {
        whiteSpace: 'pre-wrap',
      },
    }),
    ...rest,
  });

export const showError = ({ message, ...rest }: NotificationProps) =>
  showNotification({
    title: i18n.t('Notification.Error') as string,
    color: 'red',
    message,
    styles: _ => ({
      description: {
        whiteSpace: 'pre-wrap',
      },
    }),
    ...rest,
  });
