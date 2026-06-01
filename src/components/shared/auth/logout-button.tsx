"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";

interface Props {
  className?: string;
}

/**
 * Logout button used in candidate and employer sidebars.
 *
 * Flow:
 *   1. POST /api/logout — backend clears the httpOnly cookies and the
 *      refresh-token record in the DB.
 *   2. Clear the in-memory user from auth-store.
 *   3. Navigate to `/` and force a router refresh so server-rendered
 *      content re-evaluates auth state.
 *
 * Even if the backend call fails, we still clear local state and
 * redirect — better UX than leaving the user stuck on a dashboard.
 */
export default function LogoutButton({
  className,
}: Props) {
  const router = useRouter();
  const setUser = useAuthStore(
    (s) => s.setUser
  );

  const [loading, setLoading] =
    useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      await logout();
    } catch (error) {
      console.error(
        "[logout] backend call failed:",
        error
      );
    }

    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={
        className ??
        "w-full mt-6 px-4 py-3 rounded-xl text-left text-slate-700 hover:bg-slate-100 transition disabled:opacity-50"
      }
    >
      {loading
        ? "Logging out..."
        : "Log out"}
    </button>
  );
}
