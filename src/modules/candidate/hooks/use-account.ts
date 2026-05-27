import { useQuery } from "@tanstack/react-query";

import {
  fetchWalletAllotments,
  fetchActivePlan,
  fetchPlanHistory,
  fetchAvailablePlans,
  fetchJobseekerMetrics,
} from "@/lib/api/account";

export function useWalletAllotments(
  userId?: string
) {
  return useQuery({
    queryKey: [
      "wallet-allotments",
      userId,
    ],
    queryFn: () =>
      fetchWalletAllotments(
        userId as string
      ),
    enabled: !!userId,
  });
}

export function useActivePlan() {
  return useQuery({
    queryKey: [
      "active-plan",
    ],
    queryFn:
      fetchActivePlan,
  });
}

export function usePlanHistory() {
  return useQuery({
    queryKey: [
      "plan-history",
    ],
    queryFn:
      fetchPlanHistory,
  });
}

export function useAvailablePlans() {
  return useQuery({
    queryKey: [
      "available-plans",
    ],
    queryFn:
      fetchAvailablePlans,
  });
}

export function useJobseekerMetrics() {
  return useQuery({
    queryKey: [
      "jobseeker-metrics",
    ],
    queryFn:
      fetchJobseekerMetrics,
  });
}