export interface AppliedJob {
  _id: string;
  status: string;
  employerSeen: boolean;
  appliedAt: string;

  jobId: {
    _id: string;
    jobTitle: {
      name: string;
    };
    jobType: string;
    jobDescription: string;
    postedDate: string;
  };
}

export interface AppliedJobsResponse {
  appliedJobs: AppliedJob[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
}