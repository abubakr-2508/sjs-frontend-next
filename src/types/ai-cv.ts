/**
 * AI CV — Provider-Agnostic Contract
 * ----------------------------------
 * The frontend treats AI CV generation as a black box. The backend MAY
 * use any LLM provider (currently Cohere; future: Anthropic, OpenAI,
 * others) and is expected to return responses matching the types in
 * this file.
 *
 * What this means in practice:
 * - Frontend NEVER imports any LLM SDK
 * - Frontend NEVER references provider names ("cohere", "openai",
 *   "claude") anywhere
 * - Frontend NEVER selects a model. If model tiering is ever introduced
 *   for users, use ABSTRACT names ("fast", "standard", "premium") that
 *   the backend maps to a specific provider — never expose vendor or
 *   model names in the frontend API or UI
 * - Backend swaps MUST preserve the response shape exactly. If a backend
 *   change requires shape changes, update this file alongside.
 */

/** Request body for `/summerize-cv` */
export interface CvSummaryRequest {
  /** Free-form text describing the candidate (profile + manual + voice input). */
  text: string;
}

/** Response from `/summerize-cv`. Structured summary the user can review. */
export interface CvSummaryResponse {
  summary: string;
  name: string;
  jobTitle: string;
  location: string;
  mobile: string;
  email: string;
}

/** Request body for `/generate-cv` */
export interface CvGenerateRequest {
  /** Typically the JSON-stringified summary returned from `/summerize-cv`. */
  text: string;
}

/**
 * Response from `/generate-cv`. Intentionally permissive because the
 * exact fields depend on the LLM's structured output. Backend MUST
 * ensure the same shape across all providers. As UI requirements
 * solidify, narrow this type by adding required fields explicitly.
 */
export type CvGenerateResponse = Record<string, unknown>;

/** Available CV layouts the frontend can render. */
export type CvTemplate =
  | "professional"
  | "modern"
  | "minimal";

/** Request body for `/cv/preview` — returns HTML (text response). */
export interface CvPreviewRequest {
  template: CvTemplate;
  cv: CvGenerateResponse;
}

/** Request body for `/cv/save` — persists the CV server-side. */
export interface CvSaveRequest {
  template: CvTemplate;
  cv: CvGenerateResponse;
}
