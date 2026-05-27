import {
  useMutation,
} from "@tanstack/react-query";

import {
  uploadResume,
  deleteResume,
} from "@/lib/api/profile/resume";

export function useUploadResume() {
  return useMutation({
    mutationFn: uploadResume,
  });
}

export function useDeleteResume() {
  return useMutation({
    mutationFn: deleteResume,
  });
}