import apiClient from "../client";

export async function uploadResume(
  file: File
) {
  const formData = new FormData();

  formData.append("resume", file);

  const response =
    await apiClient.post(
      "/cv/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
}

export async function viewResume() {
  const response =
    await apiClient.get("/cv/view", {
      responseType: "blob",
    });

  return response.data;
}

export async function deleteResume() {
  const response =
    await apiClient.delete("/cv/delete");

  return response.data;
}