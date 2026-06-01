import apiClient from "./client";

/**
 * Filters accepted by the public /jobs listing.
 *
 * Keys here are the URL-friendly short names used in the frontend
 * (`?q=...&city=...&type=...`). They're mapped to the backend's longer
 * parameter names below (`title`, `city`, `jobType`).
 *
 * Backend's /job/all endpoint also supports `industry`, `jobCategory`,
 * `employmentStatus`, `expMin`, `expMax`, `workMode`, `posted`, `page`,
 * `limit` — wire those here when the UI exposes them.
 */
export interface JobsFilters {
  q?: string;
  city?: string;
  type?: string;
}

export async function fetchJobs(
  filters: JobsFilters = {}
) {
  const params: Record<string, string> = {};

  if (filters.q) params.title = filters.q;
  if (filters.city) params.city = filters.city;
  if (filters.type) params.jobType = filters.type;

  const response =
    await apiClient.get("/job/all", {
      params,
    });

  return {
    jobs:
      response.data.jobs ||
      response.data.data ||
      response.data ||
      [],
  };
}
