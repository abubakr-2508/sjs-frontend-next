import apiClient from "./client";

export interface EmployerCandidateSearchParams {
  page?: number;
  limit?: number;
  currentJobTitle?: string;
  skills?: string;
  location?: string;
  workType?: string;
  availability?: string;
}

export async function searchEmployerCandidates(
  params: EmployerCandidateSearchParams
) {
  const response =
    await apiClient.get(
      "/employer/search",
      {
        params,
      }
    );

  return response.data;
}

export async function inviteCandidateToJob(
  jobId: string,
  candidateId: string
) {
  const response =
    await apiClient.post(
      `/job/invite/${jobId}`,
      {
        candidateId,
      }
    );

  return response.data;
}

export async function downloadCandidateResume(
  userId: string
) {
  const response =
    await apiClient.get(
      `/cv/download?userId=${userId}`,
      {
        responseType: "blob",
      }
    );

  return response.data;
}