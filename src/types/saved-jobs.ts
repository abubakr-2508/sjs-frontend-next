export interface SavedJob {
  _id: string;

  jobTitle: {
    name: string;
  };

  jobCategory: string;
  jobType: string;
  jobDescription: string;

  offeredSalary?: {
    min: number;
    max: number;
    type: string;
    currency: string;
  };

  experience?: {
    careerLevel: string;
    minYears: number;
    maxYears: number;
    note?: string;
  };

  location?: {
    country: string;
    city: string;
    workMode: string;
  };
}

export interface SavedJobsResponse {
  message: string;
  data: SavedJob[];
}