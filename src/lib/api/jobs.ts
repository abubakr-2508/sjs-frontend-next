import apiClient from "./client";

export async function fetchJobs() {
  const response = await apiClient.get("/job/all");

  return {
    jobs: response.data.jobs || response.data.data || response.data || [],
  };
}