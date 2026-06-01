import { create } from "zustand";

import type {
  CvSummaryResponse,
  CvGenerateResponse,
  CvTemplate,
} from "@/types/ai-cv";

/**
 * AI CV builder state.
 *
 * Tracks the user's inputs (manual + voice + desired job title), the
 * LLM-produced summary, the fully generated CV, and the selected
 * template. All types reference the provider-agnostic contract in
 * `@/types/ai-cv` — see that file for why the frontend stays insulated
 * from the backend's LLM provider choice.
 */
interface AiCvState {
  manualInput: string;
  voiceInput: string;
  extraJobTitle: string;
  summaryData: CvSummaryResponse | null;
  generatedCv: CvGenerateResponse | null;
  selectedTemplate: CvTemplate | null;

  setManualInput: (value: string) => void;
  setVoiceInput: (value: string) => void;
  setExtraJobTitle: (value: string) => void;
  setSummaryData: (
    value: CvSummaryResponse
  ) => void;
  setGeneratedCv: (
    value: CvGenerateResponse
  ) => void;
  setSelectedTemplate: (
    value: CvTemplate | null
  ) => void;
  resetAiCv: () => void;
}

export const useAiCvStore =
  create<AiCvState>((set) => ({
    manualInput: "",
    voiceInput: "",
    extraJobTitle: "",
    summaryData: null,
    generatedCv: null,
    selectedTemplate: null,

    setManualInput: (value) =>
      set({ manualInput: value }),

    setVoiceInput: (value) =>
      set({ voiceInput: value }),

    setExtraJobTitle: (value) =>
      set({ extraJobTitle: value }),

    setSummaryData: (value) =>
      set({ summaryData: value }),

    setGeneratedCv: (value) =>
      set({ generatedCv: value }),

    setSelectedTemplate: (value) =>
      set({ selectedTemplate: value }),

    resetAiCv: () =>
      set({
        manualInput: "",
        voiceInput: "",
        extraJobTitle: "",
        summaryData: null,
        generatedCv: null,
        selectedTemplate: null,
      }),
  }));
