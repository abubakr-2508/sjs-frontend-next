export type UserRole =
  | "candidate"
  | "employer"
  | "admin";

export interface User {
  _id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role: UserRole;
  profileImage?: string;
  companyName?: string;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}