export interface DashboardStat {
  title: string;
  value: number | string;
}

export interface CandidateProfile {
  _id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
  role?: string;
}