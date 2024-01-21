export interface Notification {
  severity: AlertType;
  summary: string;
  message: string;
}

export type AlertType = 'success' | 'error' | 'info' | 'warn' | undefined;
