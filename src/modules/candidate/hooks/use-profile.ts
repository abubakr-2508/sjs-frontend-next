import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  fetchProfile,
  updateProfile,
  uploadResume,
  viewResume,
  deleteResume,
  addEducation,
  addExperience,
  fetchSkillsCatalog,
  addCandidateSkill,
  suggestSkills,
} from "@/lib/api/profile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
  });
}

export function useUploadResume() {
  return useMutation({
    mutationFn: uploadResume,
  });
}

export function useViewResume() {
  return useMutation({
    mutationFn: viewResume,
  });
}

export function useDeleteResume() {
  return useMutation({
    mutationFn: deleteResume,
  });
}

export function useAddEducation() {
  return useMutation({
    mutationFn: addEducation,
  });
}

export function useAddExperience() {
  return useMutation({
    mutationFn: addExperience,
  });
}

export function useSkillsCatalog() {
  return useQuery({
    queryKey: ["skills-catalog"],
    queryFn:
      fetchSkillsCatalog,
  });
}

export function useAddCandidateSkill() {
  return useMutation({
    mutationFn:
      addCandidateSkill,
  });
}

export function useSuggestSkills() {
  return useMutation({
    mutationFn:
      suggestSkills,
  });
}