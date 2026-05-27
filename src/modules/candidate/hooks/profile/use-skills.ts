import {
  useQuery,
} from "@tanstack/react-query";

import {
  fetchSkills,
  fetchJobTitles,
} from "@/lib/api/profile/skills";

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });
}

export function useJobTitles() {
  return useQuery({
    queryKey: ["job-titles"],
    queryFn: fetchJobTitles,
  });
}