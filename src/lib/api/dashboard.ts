import apiClient from "./client";

export async function fetchCandidateDashboard() {
  const response = await apiClient.get("/fetchProfile");

  return response.data;
}