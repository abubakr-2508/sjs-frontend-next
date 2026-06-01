"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import {
  useNotificationSettings,
  useUpdateNotificationSettings,
} from "@/modules/candidate/hooks/use-notifications";

export default function SettingsPage() {
  const { data, refetch } =
    useNotificationSettings();

  const updateMutation =
    useUpdateNotificationSettings();

  const [email, setEmail] =
    useState(true);

  const [push, setPush] =
    useState(true);

  const [sms, setSms] =
    useState(true);

  const [dndEnabled, setDndEnabled] =
    useState(false);

  const [dndEmail, setDndEmail] =
    useState(true);

  const [dndPush, setDndPush] =
    useState(true);

  const [dndSms, setDndSms] =
    useState(true);

  const [durationDays, setDurationDays] =
    useState(1);

  useEffect(() => {
    if (!data) return;

    setEmail(
      data.notifications?.email ??
        true
    );

    setPush(
      data.notifications?.push ??
        true
    );

    setSms(
      data.notifications?.sms ??
        true
    );

    setDndEnabled(
      data.dnd?.enabled ??
        false
    );

    setDndEmail(
      data.dnd?.channels
        ?.email ?? true
    );

    setDndPush(
      data.dnd?.channels
        ?.push ?? true
    );

    setDndSms(
      data.dnd?.channels
        ?.sms ?? true
    );

    setDurationDays(
      data.dnd
        ?.durationDays ?? 1
    );
  }, [data]);

  async function handleSave() {
    try {
      await updateMutation.mutateAsync(
        {
          notificationSettings:
            {
              email,
              push,
              sms,
            },
          dnd: {
            enabled:
              dndEnabled,
            durationDays,
            channels: {
              email:
                dndEmail,
              push:
                dndPush,
              sms: dndSms,
            },
          },
        }
      );

      await refetch();

      alert(
        "Settings updated successfully"
      );
    } catch {
      alert(
        "Failed to update settings"
      );
    }
  }

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div className="bg-white border rounded-2xl p-8 space-y-8">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Notifications
          </h2>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={email}
              onChange={(e) =>
                setEmail(
                  e.target.checked
                )
              }
            />
            Email Notifications
          </label>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={push}
              onChange={(e) =>
                setPush(
                  e.target.checked
                )
              }
            />
            Push Notifications
          </label>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={sms}
              onChange={(e) =>
                setSms(
                  e.target.checked
                )
              }
            />
            SMS Notifications
          </label>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Do Not Disturb
          </h2>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={
                dndEnabled
              }
              onChange={(e) =>
                setDndEnabled(
                  e.target.checked
                )
              }
            />
            Enable DND
          </label>

          <div>
            <label className="block mb-2">
              Duration (days)
            </label>

            <input
              type="number"
              min={1}
              value={
                durationDays
              }
              onChange={(e) =>
                setDurationDays(
                  Number(
                    e.target.value
                  )
                )
              }
              className="border rounded-xl px-4 py-2 w-full"
            />
          </div>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={
                dndEmail
              }
              onChange={(e) =>
                setDndEmail(
                  e.target.checked
                )
              }
            />
            Block Email
          </label>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={
                dndPush
              }
              onChange={(e) =>
                setDndPush(
                  e.target.checked
                )
              }
            />
            Block Push
          </label>

          <label className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={
                dndSms
              }
              onChange={(e) =>
                setDndSms(
                  e.target.checked
                )
              }
            />
            Block SMS
          </label>
        </div>

        <Button
          onClick={handleSave}
          disabled={
            updateMutation.isPending
          }
        >
          {updateMutation.isPending
            ? "Saving..."
            : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}