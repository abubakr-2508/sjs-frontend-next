"use client";

import EmptyState from "@/components/shared/feedback/empty-state";
import LoadingCard from "@/components/shared/feedback/loading-card";

import { useLatestNotifications } from "@/modules/candidate/hooks/use-notifications";

export default function NotificationsPage() {
  const {
    data,
    isLoading,
  } = useLatestNotifications();

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  const notifications =
    data?.data || [];

  if (!notifications.length) {
    return (
      <div className="p-8">
        <EmptyState
          title="No notifications"
          description="You're all caught up."
        />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Notifications
      </h1>

      {notifications.map(
        (notification) => (
          <div
            key={notification._id}
            className="bg-white border rounded-2xl p-6"
          >
            <h3 className="font-semibold">
              {notification.title ||
                "Notification"}
            </h3>

            <p className="mt-2 text-slate-600">
              {notification.message}
            </p>
          </div>
        )
      )}
    </div>
  );
}