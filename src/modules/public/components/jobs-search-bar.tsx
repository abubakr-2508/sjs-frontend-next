"use client";

import { useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Input } from "@/components/ui/input";

import { useDebouncedValue } from "@/hooks/use-debounced-value";

/**
 * Public `/jobs` search bar.
 *
 * The URL is the source of truth for filter state. Typing updates the
 * input immediately (snappy UI), but URL updates are debounced by 400ms
 * to avoid spamming the backend with a request per keystroke.
 *
 * Filters land in the URL as short query params (`?q=&city=&type=`),
 * which the API layer (`lib/api/jobs.ts`) maps to the backend's longer
 * parameter names (`title`, `city`, `jobType`).
 *
 * Browser back/forward correctly restores input values because the
 * second effect syncs URL → state on `searchParams` changes.
 */
export default function JobsSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [city, setCity] = useState(
    () => searchParams.get("city") ?? ""
  );
  const [type, setType] = useState(
    () => searchParams.get("type") ?? ""
  );

  const debouncedQ = useDebouncedValue(q);
  const debouncedCity =
    useDebouncedValue(city);
  const debouncedType =
    useDebouncedValue(type);

  // Push debounced filters into the URL.
  // - router.replace (not push): no history entry per keystroke
  // - { scroll: false }: page doesn't jump on filter change
  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedQ) next.set("q", debouncedQ);
    if (debouncedCity)
      next.set("city", debouncedCity);
    if (debouncedType)
      next.set("type", debouncedType);

    const qs = next.toString();
    router.replace(
      qs ? `${pathname}?${qs}` : pathname,
      { scroll: false }
    );
  }, [
    debouncedQ,
    debouncedCity,
    debouncedType,
    pathname,
    router,
  ]);

  // Sync URL → local state when the URL changes due to back/forward
  // navigation (user clicking the browser back button). Without this,
  // inputs would still show the previously-typed values.
  //
  // This is the canonical "external system → React state" sync pattern
  // that React docs explicitly allow. The lint rule is overly strict here
  // — we suppress it once per effect.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQ(searchParams.get("q") ?? "");
    setCity(
      searchParams.get("city") ?? ""
    );
    setType(
      searchParams.get("type") ?? ""
    );
  }, [searchParams]);

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Job title or keyword"
          value={q}
          onChange={(e) =>
            setQ(e.target.value)
          }
        />

        <Input
          placeholder="Location"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <Input
          placeholder="Job type"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        />
      </div>
    </div>
  );
}
