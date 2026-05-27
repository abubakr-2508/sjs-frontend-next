import apiClient from "../client";

export async function fetchSkills() {
  const response =
    await apiClient.get(
      "/skills/fetch"
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