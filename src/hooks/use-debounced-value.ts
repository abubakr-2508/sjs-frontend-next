import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value`. The returned value only updates
 * after `delay` ms of no change. Useful for debouncing input that drives
 * expensive operations like API calls or URL updates.
 */
export function useDebouncedValue<T>(
  value: T,
  delay: number = 400
): T {
  const [debounced, setDebounced] =
    useState(value);

  useEffect(() => {
    const handle = setTimeout(
      () => setDebounced(value),
      delay
    );
    return () => clearTimeout(handle);
  }, [value, delay]);

  return debounced;
}
