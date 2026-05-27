import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  searchEmployerCandidates,
  inviteCandidateToJob,
  downloadCandidateResume,
} from "@/lib/api/employer-candidates";

import type {
  EmployerCandidateSearchParams,
} from "@/lib/api/employer-candidates";

export function useEmployerCandidateSearch(
  params: EmployerCandidateSearchParams
) {
  return useQuery({
    queryKey: [
      "employer-candidate-search",
      params,
    ],
    queryFn: () =>
      searchEmployerCandidates(params),
  });
}

export function useInviteCandidate() {
  return useMutation({
    mutationFn: ({
      jobId,
      candidateId,
    }: {
      jobId: string;
      candidateId: string;
    }) =>
      inviteCandidateToJob(
        jobId,
        candidateId
      ),
  });
}

export function useDownloadCandidateResume() {
  return useMutation({
    mutationFn: (
      userId: string
    ) =>
      downloadCandidateResume(userId),
  });
}