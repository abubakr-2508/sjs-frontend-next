import apiClient from "./client";

export async function fetchWalletAllotments(
  userId: string
) {
  const response =
    await apiClient.get(
      `/wallet/${userId}/allotments?page=1&limit=10`
    );

  return response.data;
}

export async function fetchActivePlan() {
  const response =
    await apiClient.get(
      "/plan-active"
    );

  return response.data;
}

export async function fetchPlanHistory() {
  const response =
    await apiClient.get(
      "/plan-history"
    );

  return response.data;
}

export async function fetchAvailablePlans() {
  const response =
    await apiClient.get(
      "/fetch/plans"
    );

  return response.data;
}

export async function fetchJobseekerMetrics() {
  const response =
    await apiClient.get(
      "/api/jobseeker/metrics"
    );

  return response.data;
}