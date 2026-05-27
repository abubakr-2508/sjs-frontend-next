import apiClient from "./client";

export async function requestLoginOtp(
  input: string,
  password: string
) {
  const response = await apiClient.post(
    "/login/request-otp",
    {
      input,
      password,
    }
  );

  return response.data;
}

export async function verifyLoginOtp(
  input: string,
  otp: string
) {
  const response = await apiClient.post(
    "/login/verify-otp",
    {
      input,
      otp,
    }
  );

  return response.data;
}

export async function fetchProfile() {
  const response = await apiClient.get(
    "/fetchProfile"
  );

  return response.data;
}