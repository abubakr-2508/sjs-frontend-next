import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  fetchNotificationCount,
  fetchLatestNotifications,
  fetchNotificationSettings,
  updateNotificationSettings,
} from "@/lib/api/notifications";

export function useNotificationCount() {
  return useQuery({
    queryKey: [
      "notification-count",
    ],
    queryFn:
      fetchNotificationCount,
  });
}

export function useLatestNotifications() {
  return useQuery({
    queryKey: [
      "latest-notifications",
    ],
    queryFn:
      fetchLatestNotifications,
  });
}

export function useNotificationSettings() {
  return useQuery({
    queryKey: [
      "notification-settings",
    ],
    queryFn:
      fetchNotificationSettings,
  });
}

export function useUpdateNotificationSettings() {
  return useMutation({
    mutationFn:
      updateNotificationSettings,
  });
}