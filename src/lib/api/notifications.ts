import apiClient from "./client";

export async function fetchNotificationCount() {
  const response =
    await apiClient.get(
      "/notification/count"
    );

  return response.data;
}

export async function fetchLatestNotifications() {
  const response =
    await apiClient.get(
      "/notification/latest"
    );

  return response.data;
}

export async function fetchNotificationSettings() {
  const response =
    await apiClient.get(
      "/fetch/notification-settings"
    );

  return response.data;
}

export async function updateNotificationSettings(
  payload: {
    notificationSettings: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    dnd: {
      enabled: boolean;
      durationDays: number;
      channels: {
        email: boolean;
        push: boolean;
        sms: boolean;
      };
    };
  }
) {
  const response =
    await apiClient.patch(
      "/update/notification-settings",
      payload
    );

  return response.data;
}