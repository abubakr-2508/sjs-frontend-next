import apiClient from "../client";

export async function addExperience(
  payload: {
    title: string;
    company: string;
    from: string;
    to: string | null;
    currentlyWorking: boolean;
    description: string;
  }
) {
  const response =
    await apiClient.post(
      "/candidate/experience",
      payload
    );

  return response.data;
}