import apiClient from "../client";

export async function addEducation(
  payload: {
    course: string;
    institution: string;
    startDate: string;
    endDate: string | null;
    currentlyPursuing: boolean;
  }
) {
  const response =
    await apiClient.post(
      "/candidate/education",
      payload
    );

  return response.data;
}