import { useEffect } from "react";

import { fetchProfile } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";

/**
 * Hydrate the auth store on mount.
 *
 * The access_token lives in an httpOnly cookie that JavaScript cannot
 * read, so we can't pre-check "do we have a token?" like the Vite version
 * did. Instead, we always attempt to fetch the profile:
 *   - 200 → cookie was valid → setUser(profile)
 *   - 401 → no cookie or expired → setUser(null) (middleware will redirect
 *           on protected routes anyway)
 *
 * Either way, setLoading(false) lets the UI render.
 *
 * Mount this hook once near the app root (we do so inside Providers).
 * Repeated mounts are wasteful but not harmful.
 */
export function useAuthInit() {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    async function init() {
      try {
        const profile = await fetchProfile();

        // Backend wraps the user object as { data: <user> } in /fetchProfile.
        // Fall back to other common shapes just in case.
        const userData =
          profile?.data ||
          profile?.user ||
          profile?.profile ||
          profile;

        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [setUser, setLoading]);
}
