import {
  useMutation,
} from "@tanstack/react-query";

import {
  summarizeCv,
  generateCv,
  previewCv,
  saveCv,
} from "@/lib/api/ai-cv";

export function useSummarizeCv() {
  return useMutation({
    mutationFn: summarizeCv,
  });
}

export function useGenerateCv() {
  return useMutation({
    mutationFn: generateCv,
  });
}

export function usePreviewCv() {
  return useMutation({
    mutationFn: previewCv,
  });
}

export function useSaveCv() {
  return useMutation({
    mutationFn: saveCv,
  });
}