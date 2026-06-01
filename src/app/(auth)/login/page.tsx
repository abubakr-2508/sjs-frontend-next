"use client";

import { Suspense, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  requestLoginOtp,
  verifyLoginOtp,
  fetchProfile,
} from "@/lib/api/auth";

import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="text-sm text-slate-500">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const setUser = useAuthStore(
    (s) => s.setUser
  );

  const [input, setInput] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [step, setStep] = useState<
    "credentials" | "otp"
  >("credentials");

  const [loading, setLoading] =
    useState(false);

  function redirectAfterLogin(role: string) {
    // Honor the ?from=... query param from middleware (only same-origin paths)
    if (from && from.startsWith("/")) {
      router.push(from);
      return;
    }

    // Role-based default
    if (role === "employer") {
      router.push("/employer/dashboard");
    } else if (
      role === "admin" ||
      role === "super-admin"
    ) {
      router.push("/admin/dashboard");
    } else {
      router.push("/candidate/dashboard");
    }
  }

  async function handleRequestOtp() {
    setLoading(true);

    try {
      await requestLoginOtp(
        input,
        password
      );

      setStep("otp");
    } catch (err) {
      console.error(
        "[login] requestLoginOtp failed:",
        err
      );
      toast.error("Invalid credentials or failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    setLoading(true);

    try {
      const auth =
        await verifyLoginOtp(
          input,
          otp
        );

      console.log(
        "[login] verifyLoginOtp success:",
        auth
      );

      // Backend has set httpOnly cookies (access_token + refresh_token).
      // No localStorage handling needed — cookies do the work now.

      const profile =
        await fetchProfile();

      console.log(
        "[login] fetchProfile success:",
        profile
      );

      const user =
        profile.user ||
        profile.profile ||
        profile;

      setUser(user);

      redirectAfterLogin(
        auth.role
      );
    } catch (err) {
      console.error(
        "[login] verifyOtp/fetchProfile failed:",
        err
      );
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full max-w-md bg-white border rounded-2xl p-8 space-y-6"
      suppressHydrationWarning
    >
      <h1 className="text-2xl font-bold">Login</h1>

      {step === "credentials" && (
        <>
          <Input
            placeholder="Email or phone"
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <Button
            className="w-full"
            onClick={handleRequestOtp}
            disabled={loading}
          >
            {loading
              ? "Sending OTP..."
              : "Continue"}
          </Button>
        </>
      )}

      {step === "otp" && (
        <>
          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }
          />

          <Button
            className="w-full"
            onClick={handleVerifyOtp}
            disabled={loading}
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </Button>
        </>
      )}
    </div>
  );
}
