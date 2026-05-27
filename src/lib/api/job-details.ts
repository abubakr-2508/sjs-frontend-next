import apiClient from "./client";

export async function fetchJobDetails(id: string) {
  const response = await apiClient.get(`/job/${id}`);

  return response.data;
}