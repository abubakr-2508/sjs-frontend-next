/**
 * AI CV API — Provider-Agnostic Contract
 * --------------------------------------
 * These functions talk to OUR backend, which internally calls whichever
 * LLM provider it chooses (currently Cohere; future: Anthropic, OpenAI,
 * others). The frontend does NOT know or care which provider is used.
 *
 * Request/response shapes are defined in `@/types/ai-cv`. Any backend
 * provider swap MUST preserve those shapes. See that file for the
 * contract rules.
 */

import apiClient from "./client";

import type {
  CvSummaryRequest,
  CvSummaryResponse,
  CvGenerateRequest,
  CvGenerateResponse,
  CvPreviewRequest,
  CvSaveRequest,
} from "@/types/ai-cv";

export async function summarizeCv(
  payload: CvSummaryRequest
): Promise<CvSummaryResponse> {
  const response =
    await apiClient.post<CvSummaryResponse>(
      "/summerize-cv",
      payload
    );

  return response.data;
}

export async function generateCv(
  payload: CvGenerateRequest
): Promise<CvGenerateResponse> {
  const response =
    await apiClient.post<CvGenerateResponse>(
      "/generate-cv",
      payload
    );

  return response.data;
}

export async function previewCv(
  payload: CvPreviewRequest
): Promise<string> {
  const response =
    await apiClient.post<string>(
      "/cv/preview",
      payload,
      {
        responseType: "text",
      }
    );

  return response.data;
}

export async function saveCv(
  payload: CvSaveRequest
): Promise<unknown> {
  const response =
    await apiClient.post(
      "/cv/save",
      payload
    );

  return response.data;
}
