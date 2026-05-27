import apiClient from "./client";

export async function applyToJob(
  jobId: string
) {
  const response = await apiClient.post(
    `/jobs/${jobId}/apply`
  );

  return response.data;
}