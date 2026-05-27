import {
  useMutation,
} from "@tanstack/react-query";

import {
  addEducation,
} from "@/lib/api/profile/education";

export function useAddEducation() {
  return useMutation({
    mutationFn: addEducation,
  });
}