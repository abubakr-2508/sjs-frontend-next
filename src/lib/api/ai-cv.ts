import apiClient from "./client";

export async function summarizeCv(
  payload: {
    text: string;
  }
) {
  const response =
    await apiClient.post(
      "/summerize-cv",
      payload
    );

  return response.data;
}

export async function generateCv(
  payload: {
    text: string;
  }
) {
  const response =
    await apiClient.post(
      "/generate-cv",
      payload
    );

  return response.data;
}

export async function previewCv(
  payload: {
    template:
      | "professional"
      | "modern"
      | "minimal";
    cv: unknown;
  }
) {
  const response =
    await apiClient.post(
      "/cv/preview",
      payload,
      {
        responseType: "text",
      }
    );

  return response.data;
}

export async function saveCv(
  payload: {
    template:
      | "professional"
      | "modern"
      | "minimal";
    cv: unknown;
  }
) {
  const response =
    await apiClient.post(
      "/cv/save",
      payload
    );

  return response.data;
}