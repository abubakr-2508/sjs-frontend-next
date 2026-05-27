import apiClient from "./client";

export async function fetchSavedJobs() {
  const response = await apiClient.get(
    "/jobs/saved-jobs"
  );

  return response.data;
}