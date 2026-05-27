import { create } from "zustand";

type TemplateType =
  | "professional"
  | "modern"
  | "minimal"
  | null;

interface SummaryData {
  summary: string;
  name: string;
  jobTitle: string;
  location: string;
  mobile: string;
  email: string;
}

interface AiCvState {
  manualInput: string;
  voiceInput: string;
  extraJobTitle: string;
  summaryData: SummaryData | null;
  generatedCv: unknown;
  selectedTemplate: TemplateType;

  setManualInput: (value: string) => void;
  setVoiceInput: (value: string) => void;
  setExtraJobTitle: (value: string) => void;
  setSummaryData: (value: SummaryData) => void;
  setGeneratedCv: (value: unknown) => void;
  setSelectedTemplate: (value: TemplateType) => void;
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
