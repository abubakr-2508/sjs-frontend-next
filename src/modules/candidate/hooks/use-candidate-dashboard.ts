import { useQuery } from "@tanstack/react-query";
import { fetchCandidateDashboard } from "@/lib/api/dashboard";

export function useCandidateDashboard() {
  return useQuery({
    queryKey: ["candidate-dashboard"],
    queryFn: fetchCandidateDashboard,
  });
}