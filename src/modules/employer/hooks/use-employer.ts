import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchEmployerMetrics,
  fetchEmployerJobs,
  fetchEmployerJobDetails,
  updateEmployerJobStatus,
  fetchJobTitles,
  fetchIndustries,
  fetchCountries,
  fetchCities,
  fetchSkills,
  suggestSkills,
  createEmployerJob,
  fetchJobApplicants,
  updateApplicantStatus,
  fetchEmployerProfile,
  updateEmployerProfile,
  fetchEmployerPlans,
  fetchEmployerActivePlan,
  fetchEmployerPlanHistory,
  cancelEmployerPlan,
  initiateEmployerPlanPurchase,
  fetchEmployerTestimonials,
  createEmployerTestimonial,
  deleteEmployerTestimonial,
  fetchEmployerInterviews,
  fetchInterviewDetails,
  rescheduleInterview,
  cancelInterview,

  fetchLoginHistory,
  fetchEmployerRequestHistory,
  fetchNotificationSettings,
  updateNotificationSettings,
  fetchWalletAllotments,
  changeEmployerPassword,
} from "@/lib/api/employer";

/* DASHBOARD */

export function useEmployerMetrics() {
  return useQuery({
    queryKey: ["employer-metrics"],
    queryFn: fetchEmployerMetrics,
  });
}

/* JOBS */

export function useEmployerJobs() {
  return useQuery({
    queryKey: ["employer-jobs"],
    queryFn: fetchEmployerJobs,
  });
}

export function useEmployerJobDetails(
  jobId: string | undefined
) {
  return useQuery({
    queryKey: [
      "employer-job-details",
      jobId,
    ],
    queryFn: () =>
      fetchEmployerJobDetails(jobId as string),
    enabled: !!jobId,
  });
}

export function useUpdateEmployerJobStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      jobId,
      status,
    }: {
      jobId: string;
      status:
        | "active"
        | "closed"
        | "deleted";
    }) =>
      updateEmployerJobStatus(
        jobId,
        status
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employer-jobs"],
      });
    },
  });
}

/* POST JOB */

export function useJobTitles() {
  return useQuery({
    queryKey: ["job-titles"],
    queryFn: fetchJobTitles,
  });
}

export function useIndustries() {
  return useQuery({
    queryKey: ["industries"],
    queryFn: fetchIndustries,
  });
}

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
}

export function useCities(
  country: string
) {
  return useQuery({
    queryKey: [
      "cities",
      country,
    ],
    queryFn: () =>
      fetchCities(country),
    enabled: !!country,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });
}

export function useSuggestSkills() {
  return useMutation({
    mutationFn: suggestSkills,
  });
}

export function useCreateEmployerJob() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createEmployerJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employer-jobs"],
      });
    },
  });
}

/* APPLICANTS */

export function useJobApplicants(
  jobId: string | undefined
) {
  return useQuery({
    queryKey: [
      "job-applicants",
      jobId,
    ],
    queryFn: () =>
      fetchJobApplicants(jobId as string),
    enabled: !!jobId,
  });
}

export function useUpdateApplicantStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      jobId,
      applicationId,
      status,
    }: {
      jobId: string;
      applicationId: string;
      status: string;
    }) =>
      updateApplicantStatus(
        jobId,
        applicationId,
        status
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["job-applicants"],
      });
    },
  });
}

/* PROFILE */

export function useEmployerProfile() {
  return useQuery({
    queryKey: ["employer-profile"],
    queryFn: fetchEmployerProfile,
  });
}

export function useUpdateEmployerProfile() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      updateEmployerProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "employer-profile",
        ],
      });
    },
  });
}

/* SUBSCRIPTIONS */

export function useEmployerPlans() {
  return useQuery({
    queryKey: ["employer-plans"],
    queryFn: fetchEmployerPlans,
  });
}

export function useEmployerActivePlan() {
  return useQuery({
    queryKey: [
      "employer-active-plan",
    ],
    queryFn:
      fetchEmployerActivePlan,
  });
}

export function useEmployerPlanHistory() {
  return useQuery({
    queryKey: [
      "employer-plan-history",
    ],
    queryFn:
      fetchEmployerPlanHistory,
  });
}

export function useCancelEmployerPlan() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      cancelEmployerPlan,

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useEmployerPlanPurchase() {
  return useMutation({
    mutationFn:
      initiateEmployerPlanPurchase,
  });
}

/* TESTIMONIALS */

export function useEmployerTestimonials() {
  return useQuery({
    queryKey: [
      "employer-testimonials",
    ],
    queryFn:
      fetchEmployerTestimonials,
  });
}

export function useCreateEmployerTestimonial() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      createEmployerTestimonial,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "employer-testimonials",
        ],
      });
    },
  });
}

export function useDeleteEmployerTestimonial() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      deleteEmployerTestimonial,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "employer-testimonials",
        ],
      });
    },
  });
}

/* INTERVIEWS */

export function useEmployerInterviews(
  page = 1
) {
  return useQuery({
    queryKey: [
      "employer-interviews",
      page,
    ],
    queryFn: () =>
      fetchEmployerInterviews(page),
  });
}

export function useInterviewDetails(
  interviewId: string
) {
  return useQuery({
    queryKey: [
      "interview-details",
      interviewId,
    ],
    queryFn: () =>
      fetchInterviewDetails(
        interviewId
      ),
    enabled: !!interviewId,
  });
}

export function useRescheduleInterview() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      interviewId,
      payload,
    }: {
      interviewId: string;
      payload: {
        newSlotStart: string;
        newSlotEnd: string;
        reason?: string;
      };
    }) =>
      rescheduleInterview(
        interviewId,
        payload
      ),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useCancelInterview() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: cancelInterview,

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
/* ACCOUNT */

export function useLoginHistory() {
  return useQuery({
    queryKey: ["login-history"],
    queryFn: fetchLoginHistory,
  });
}

export function useEmployerRequestHistory() {
  return useQuery({
    queryKey: [
      "employer-request-history",
    ],
    queryFn:
      fetchEmployerRequestHistory,
  });
}

export function useNotificationSettings() {
  return useQuery({
    queryKey: [
      "notification-settings",
    ],
    queryFn:
      fetchNotificationSettings,
  });
}

export function useUpdateNotificationSettings() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      updateNotificationSettings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "notification-settings",
        ],
      });
    },
  });
}

export function useWalletAllotments(
  userId: string
) {
  return useQuery({
    queryKey: [
      "wallet-allotments",
      userId,
    ],
    queryFn: () =>
      fetchWalletAllotments(userId),
    enabled: !!userId,
  });
}

export function useChangeEmployerPassword() {
  return useMutation({
    mutationFn:
      changeEmployerPassword,
  });
}