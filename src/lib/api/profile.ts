import apiClient from "./client";

export async function fetchProfile() {
  const response =
    await apiClient.get(
      "/fetchProfile"
    );

  return response.data;
}

export async function updateProfile(
  payload: {
    name: string;
    email: string;
    mobile: string;
    location: {
      country: string;
      city: string;
      pincode: string;
    };
  }
) {
  const response =
    await apiClient.patch(
      "/updateProfile",
      payload
    );

  return response.data;
}

export async function uploadResume(
  file: File
) {
  const formData =
    new FormData();

  formData.append(
    "resume",
    file
  );

  const response =
    await apiClient.post(
      "/cv/upload",
      formData
    );

  return response.data;
}

export async function viewResume() {
  const response =
    await apiClient.get(
      "/cv/view",
      {
        responseType:
          "blob",
      }
    );

  return response.data;
}

export async function deleteResume() {
  const response =
    await apiClient.delete(
      "/cv/delete"
    );

  return response.data;
}

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

export async function fetchSkillsCatalog() {
  const response =
    await apiClient.get(
      "/skills/fetch"
    );

  return response.data;
}

export async function addCandidateSkill(
  payload: {
    skillId: string;
    knowledgeLevel: string;
    experienceMonths: number;
    isPrimary: boolean;
  }
) {
  const response =
    await apiClient.post(
      "/candidate/skill",
      payload
    );

  return response.data;
}

export async function suggestSkills(
  payload: {
    jobTitle: string;
  }
) {
  const response =
    await apiClient.post(
      "/suggest/skills",
      payload
    );

  return response.data;
}