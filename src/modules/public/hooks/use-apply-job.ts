import { useMutation } from "@tanstack/react-query";
import { applyToJob } from "@/lib/api/apply-job";

export function useApplyJob() {
  return useMutation({
    mutationFn: applyToJob,
  });
}