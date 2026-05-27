export interface NotificationItem {
  _id: string;
  title?: string;
  message?: string;
  createdAt?: string;
  read?: boolean;
}

export interface NotificationResponse {
  data: NotificationItem[];
  meta: {
    page: number;
    limit: number;
    fetched: number;
    totalPages: number;
  };
}