export interface JobLocation {
  country?: string;
  city?: string;
  workMode?: string;
}

export interface Job {
  _id: string;
  title: string;
  companyName?: string;
  employerName?: string;
  location: JobLocation;
  salary?: string;
  jobType?: string;
  description?: string;
  createdAt?: string;
}

export interface JobsResponse {
  jobs: Job[];
}