export interface EducationItem {
  _id?: string;
  course: string;
  institution: string;
  startDate: string;
  endDate?: string | null;
  currentlyPursuing: boolean;
}

export interface ExperienceItem {
  _id?: string;
  title: string;
  company: string;
  from: string;
  to?: string | null;
  currentlyWorking: boolean;
  description: string;
}

export interface SkillItem {
  _id?: string;
  name: string;
}

export interface CandidateProfile {
  name: string;
  email: string;
  mobile: string;

  location: {
    country: string;
    city: string;
    pincode: string;
  };

  image?: string | null;

  education?: EducationItem[];
  experience?: ExperienceItem[];
  skills?: SkillItem[];

  resume?: boolean;
}