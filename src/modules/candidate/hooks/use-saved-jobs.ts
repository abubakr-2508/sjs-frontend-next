import { useQuery } from "@tanstack/react-query";
import { fetchSavedJobs } from "@/lib/api/saved-jobs";

export function useSavedJobs() {
  return useQuery({
    queryKey: ["saved-jobs"],
    queryFn: fetchSavedJobs,
  });
}