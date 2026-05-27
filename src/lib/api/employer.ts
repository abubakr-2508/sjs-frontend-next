import apiClient from "./client";

export async function fetchEmployerMetrics() {
  const response =
    await apiClient.get(
      "/api/employer/job-metrics"
    );

  return response.data;
}

export async function fetchEmployerJobs() {
  const response =
    await apiClient.get(
      "/job/posted-jobs?page=1&limit=10"
    );

  return response.data;
}

export async function fetchEmployerJobDetails(
  jobId: string
) {
  const response =
    await apiClient.get(
      `/job/view-details/${jobId}`
    );

  return response.data;
}

export async function updateEmployerJobStatus(
  jobId: string,
  status:
    | "active"
    | "closed"
    | "deleted"
) {
  const response =
    await apiClient.patch(
      `/job/statusUpdate/${jobId}`,
      { status }
    );

  return response.data;
}

export async function fetchJobTitles() {
  const response =
    await apiClient.get(
      "/jobTitle/fetch"
    );

  return response.data;
}

export async function fetchIndustries() {
  const response =
    await apiClient.get(
      "/industry/fetch"
    );

  return response.data;
}

export async function fetchCountries() {
  const response =
    await apiClient.get(
      "/fetch/countries"
    );

  return response.data;
}

export async function fetchCities(
  country: string
) {
  const response =
    await apiClient.get(
      `/fetch/cities?name=${country}`
    );

  return response.data;
}

export async function fetchSkills() {
  const response =
    await apiClient.get(
      "/skills/fetch"
    );

  return response.data;
}

export async function suggestSkills(
  jobTitle: string
) {
  const response =
    await apiClient.post(
      "/suggest/skills",
      { jobTitle }
    );

  return response.data;
}

export async function createEmployerJob(
  payload: any
) {
  const response =
    await apiClient.post(
      "/job/postjob",
      payload
    );

  return response.data;
}

export async function fetchJobApplicants(
  jobId: string
) {
  const response =
    await apiClient.get(
      `/job/applicants/${jobId}?page=1&limit=20`
    );

  return response.data;
}

export async function updateApplicantStatus(
  jobId: string,
  applicationId: string,
  status: string
) {
  const response =
    await apiClient.patch(
      `/job/application/${jobId}/${applicationId}/status`,
      { status }
    );

  return response.data;
}

export async function fetchEmployerProfile() {
  const response =
    await apiClient.get(
      "/fetchProfile"
    );

  return response.data;
}

export async function updateEmployerProfile(
  payload: any
) {
  const response =
    await apiClient.patch(
      "/updateProfile",
      payload
    );

  return response.data;
}

/* SUBSCRIPTIONS */

export async function fetchEmployerPlans() {
  const response =
    await apiClient.get(
      "/fetch/plans"
    );

  return response.data;
}

export async function fetchEmployerActivePlan() {
  const response =
    await apiClient.get(
      "/plan-active"
    );

  return response.data;
}

export async function fetchEmployerPlanHistory() {
  const response =
    await apiClient.get(
      "/plan-history"
    );

  return response.data;
}

export async function cancelEmployerPlan() {
  const response =
    await apiClient.patch(
      "/cancel-plan"
    );

  return response.data;
}

export async function initiateEmployerPlanPurchase(
  plan: any
) {
  console.log(
    "Payment integration pending backend",
    plan
  );

  return {
    success: false,
    message:
      "Payment integration pending backend fix",
  };
}

/* TESTIMONIALS */

export async function fetchEmployerTestimonials() {
  const response =
    await apiClient.get(
      "/fetch/testimonials"
    );

  return response.data;
}

export async function createEmployerTestimonial(
  payload: {
    designation: string;
    title: string;
    message: string;
    rating: string;
    tag: string;
    video?: string;
  }
) {
  const response =
    await apiClient.post(
      "/testimonials",
      payload
    );

  return response.data;
}

export async function deleteEmployerTestimonial(
  testimonialId: string
) {
  const response =
    await apiClient.delete(
      `/testimonials/remove/${testimonialId}`
    );

  return response.data;
}

/* INTERVIEWS */

export async function fetchEmployerInterviews(
  page = 1
) {
  const response =
    await apiClient.get(
      `/interview/fetch?page=${page}`
    );

  return response.data;
}

export async function fetchInterviewDetails(
  interviewId: string
) {
  const response =
    await apiClient.get(
      `/interview/details/${interviewId}`
    );

  return response.data;
}

export async function rescheduleInterview(
  interviewId: string,
  payload: {
    newSlotStart: string;
    newSlotEnd: string;
    reason?: string;
  }
) {
  const response =
    await apiClient.patch(
      `/interview/reschedule/${interviewId}`,
      payload
    );

  return response.data;
}

export async function cancelInterview(
  interviewId: string
) {
  const response =
    await apiClient.patch(
      `/interview/cancel/${interviewId}`,
      {}
    );

  return response.data;
}

/* ACCOUNT */

export async function fetchLoginHistory() {
  const response =
    await apiClient.get(
      "/loginhistory"
    );

  return response.data;
}

export async function fetchEmployerRequestHistory() {
  const response =
    await apiClient.get(
      "/api/employer-request-history"
    );

  return response.data;
}

export async function fetchNotificationSettings() {
  const response =
    await apiClient.get(
      "/fetch/notification-settings"
    );

  return response.data;
}

export async function updateNotificationSettings(
  payload: {
    notificationSettings: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    dnd: {
      enabled: boolean;
      startDate: string | null;
      endDate: string | null;
      durationDays: number | null;
      channels: {
        email: boolean;
        push: boolean;
        sms: boolean;
      };
    };
  }
) {
  const response =
    await apiClient.patch(
      "/update/notification-settings",
      payload
    );

  return response.data;
}

export async function fetchWalletAllotments(
  userId: string
) {
  const response =
    await apiClient.get(
      `/wallet/${userId}/allotments`
    );

  return response.data;
}

export async function changeEmployerPassword(
  payload: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
) {
  const response =
    await apiClient.patch(
      "/change-password",
      payload
    );

  return response.data;
}