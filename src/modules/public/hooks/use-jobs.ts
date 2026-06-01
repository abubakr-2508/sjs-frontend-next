import { useQuery } from "@tanstack/react-query";

import {
  fetchJobs,
  type JobsFilters,
} from "@/lib/api/jobs";

export function useJobs(
  filters: JobsFilters = {}
) {
  return useQuery({
    // Include filters in the queryKey so React Query caches each filter
    // combination independently and refetches when filters change.
    queryKey: ["jobs", filters],
    queryFn: () => fetchJobs(filters),
  });
}
