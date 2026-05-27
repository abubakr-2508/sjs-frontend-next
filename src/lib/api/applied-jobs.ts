import apiClient from "./client";

export async function fetchAppliedJobs(
  page = 1,
  limit = 10
) {
  const response = await apiClient.get(
    `/jobs/applied?page=${page}&limit=${limit}`
  );

  return response.data;
}