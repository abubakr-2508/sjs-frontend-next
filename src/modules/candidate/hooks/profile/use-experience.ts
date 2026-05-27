import {
  useMutation,
} from "@tanstack/react-query";

import {
  addExperience,
} from "@/lib/api/profile/experience";

export function useAddExperience() {
  return useMutation({
    mutationFn: addExperience,
  });
}