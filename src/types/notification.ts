export interface Notification {
  notificationType: AlertType | undefined;
  message: string;
}

export type AlertType = 'success' | 'error' | 'info' | 'warning';
