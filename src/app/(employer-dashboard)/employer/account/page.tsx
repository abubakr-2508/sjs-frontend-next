"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useEmployerProfile,
  useLoginHistory,
  useEmployerRequestHistory,
  useNotificationSettings,
  useUpdateNotificationSettings,
  useWalletAllotments,
  useChangeEmployerPassword,
} from "@/modules/employer/hooks/use-employer";

type TabType =
  | "login"
  | "requests"
  | "notifications"
  | "wallet"
  | "password";

export default function EmployerAccountPage() {
  const [activeTab, setActiveTab] =
    useState<TabType>("login");

  const { data: profileData } =
    useEmployerProfile();

  const userId =
    profileData?.data?._id || "";

  const { data: loginData } =
    useLoginHistory();

  const { data: requestData } =
    useEmployerRequestHistory();

  const {
    data: notificationData,
  } = useNotificationSettings();

  const { data: walletData } =
    useWalletAllotments(userId);

  const updateNotificationsMutation =
    useUpdateNotificationSettings();

  const changePasswordMutation =
    useChangeEmployerPassword();

  const [emailNotif, setEmailNotif] =
    useState(true);

  const [pushNotif, setPushNotif] =
    useState(true);

  const [smsNotif, setSmsNotif] =
    useState(true);

  const [dndEnabled, setDndEnabled] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  async function saveNotifications() {
    try {
      await updateNotificationsMutation.mutateAsync(
        {
          notificationSettings: {
            email: emailNotif,
            push: pushNotif,
            sms: smsNotif,
          },
          dnd: {
            enabled: dndEnabled,
            startDate: null,
            endDate: null,
            durationDays: null,
            channels: {
              email: true,
              push: true,
              sms: true,
            },
          },
        }
      );

      alert("Updated successfully");
    } catch {
      alert("Update failed");
    }
  }

  async function handlePasswordChange() {
    try {
      await changePasswordMutation.mutateAsync(
        {
          currentPassword,
          newPassword,
          confirmPassword,
        }
      );

      alert("Password changed");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      alert("Password update failed");
    }
  }

  const loginHistory =
    loginData?.data?.loginfo || [];

  const requestHistory =
    requestData?.services || [];

  const walletItems =
    walletData?.items || [];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Account Center
      </h1>

      {/* TABS */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant={
            activeTab === "login"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setActiveTab("login")
          }
        >
          Login History
        </Button>

        <Button
          variant={
            activeTab === "requests"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setActiveTab("requests")
          }
        >
          Request History
        </Button>

        <Button
          variant={
            activeTab ===
            "notifications"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setActiveTab(
              "notifications"
            )
          }
        >
          Notifications
        </Button>

        <Button
          variant={
            activeTab === "wallet"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setActiveTab("wallet")
          }
        >
          Wallet
        </Button>

        <Button
          variant={
            activeTab === "password"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setActiveTab("password")
          }
        >
          Change Password
        </Button>
      </div>

      {/* LOGIN HISTORY */}
      {activeTab === "login" && (
        <div className="space-y-4">
          {loginHistory.map(
            (item: any, idx: number) => (
              <div
                key={idx}
                className="border rounded-2xl p-5"
              >
                <div>
                  Browser: {item.browser}
                </div>
                <div>
                  OS:{" "}
                  {
                    item.operatingSystem
                  }
                </div>
                <div>
                  IP:{" "}
                  {item.ipAddress}
                </div>
                <div>
                  Location:{" "}
                  {item.location}
                </div>
                <div>
                  {new Date(
                    item.date
                  ).toLocaleString()}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* REQUEST HISTORY */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          {requestHistory.map(
            (item: any) => (
              <div
                key={item._id}
                className="border rounded-2xl p-5"
              >
                <div>
                  Service:{" "}
                  {
                    item.ServicesRequired
                  }
                </div>
                <div>
                  Company:{" "}
                  {
                    item.companyName
                  }
                </div>
                <div>
                  Contact:{" "}
                  {
                    item.contactPerson
                  }
                </div>
                <div>
                  Email:{" "}
                  {item.emailID}
                </div>
                <div>
                  {
                    item.description
                  }
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* NOTIFICATIONS */}
      {activeTab ===
        "notifications" && (
        <div className="space-y-6 border rounded-2xl p-6">
          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={(e) =>
                setEmailNotif(
                  e.target.checked
                )
              }
            />
            Email Notifications
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={pushNotif}
              onChange={(e) =>
                setPushNotif(
                  e.target.checked
                )
              }
            />
            Push Notifications
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={smsNotif}
              onChange={(e) =>
                setSmsNotif(
                  e.target.checked
                )
              }
            />
            SMS Notifications
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={dndEnabled}
              onChange={(e) =>
                setDndEnabled(
                  e.target.checked
                )
              }
            />
            Enable DND
          </label>

          <Button
            onClick={
              saveNotifications
            }
          >
            Save Settings
          </Button>
        </div>
      )}

      {/* WALLET */}
      {activeTab === "wallet" && (
        <div className="space-y-4">
          <div className="text-xl font-semibold">
            Wallet Points:{" "}
            {
              profileData?.data
                ?.walletPoints
            }
          </div>

          {walletItems.length ===
          0 ? (
            <div>
              No wallet history
            </div>
          ) : (
            walletItems.map(
              (
                item: any,
                idx: number
              ) => (
                <div
                  key={idx}
                  className="border rounded-2xl p-5"
                >
                  {JSON.stringify(
                    item
                  )}
                </div>
              )
            )
          )}
        </div>
      )}

      {/* PASSWORD */}
      {activeTab === "password" && (
        <div className="space-y-4 border rounded-2xl p-6">
          <input
            type="password"
            placeholder="Current Password"
            value={
              currentPassword
            }
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <Button
            onClick={
              handlePasswordChange
            }
          >
            Update Password
          </Button>
        </div>
      )}
    </div>
  );
}