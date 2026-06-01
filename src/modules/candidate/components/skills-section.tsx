"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useProfile,
  useSkillsCatalog,
  useAddCandidateSkill,
  useSuggestSkills,
} from "@/modules/candidate/hooks/use-profile";

export default function SkillsSection() {
  const {
    data: profileData,
    refetch,
  } = useProfile();

  const {
    data: catalogData,
  } = useSkillsCatalog();

  const addSkillMutation =
    useAddCandidateSkill();

  const suggestMutation =
    useSuggestSkills();

  const profile =
    profileData?.data;

  const savedSkills =
    profile?.skills || [];

  const catalog =
    catalogData || [];

  const [
    selectedSkillId,
    setSelectedSkillId,
  ] = useState("");

  const [
    knowledgeLevel,
    setKnowledgeLevel,
  ] = useState(
    "intermediate"
  );

  const [
    experienceMonths,
    setExperienceMonths,
  ] = useState(12);

  const [isPrimary, setIsPrimary] =
    useState(true);

  async function handleAddSkill() {
    if (!selectedSkillId) {
      toast.error("Select a skill");
      return;
    }

    try {
      await addSkillMutation.mutateAsync(
        {
          skillId:
            selectedSkillId,
          knowledgeLevel,
          experienceMonths,
          isPrimary,
        }
      );

      await refetch();

      toast.success("Skill added successfully");
    } catch {
      toast.error("Failed to add skill");
    }
  }

  async function handleSuggestSkills() {
    try {
      const result =
        await suggestMutation.mutateAsync(
          {
            jobTitle:
              profile
                ?.experience?.[0]
                ?.title || "",
          }
        );

      const suggestions =
        result.data
          ?.slice(0, 5)
          ?.map(
            (item: any) =>
              item.skill
          )
          ?.join(", ");

      toast.error(
        suggestions ||
          "No suggestions"
      );
    } catch {
      toast.error("Suggestion failed");
    }
  }

  return (
    <div className="bg-white border rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold">
        Skills
      </h2>

      <div className="space-y-3">
        {savedSkills.length >
        0 ? (
          savedSkills.map(
            (skill: any) => (
              <div
                key={skill._id}
                className="border rounded-xl p-4"
              >
                <div className="font-semibold">
                  {
                    skill
                      .skillId
                      ?.name
                  }
                </div>

                <div className="text-sm text-slate-500">
                  {
                    skill.knowledgeLevel
                  }{" "}
                  •{" "}
                  {
                    skill.experienceMonths
                  }{" "}
                  months
                </div>
              </div>
            )
          )
        ) : (
          <p>
            No skills added
          </p>
        )}
      </div>

      <select
        className="w-full border rounded-xl px-4 py-3"
        value={
          selectedSkillId
        }
        onChange={(e) =>
          setSelectedSkillId(
            e.target.value
          )
        }
      >
        <option value="">
          Select Skill
        </option>

        {catalog.map(
          (skill: any) => (
            <option
              key={skill._id}
              value={skill._id}
            >
              {skill.name}
            </option>
          )
        )}
      </select>

      <Input
        placeholder="Knowledge level"
        value={
          knowledgeLevel
        }
        onChange={(e) =>
          setKnowledgeLevel(
            e.target.value
          )
        }
      />

      <Input
        type="number"
        placeholder="Experience in months"
        value={
          experienceMonths
        }
        onChange={(e) =>
          setExperienceMonths(
            Number(
              e.target.value
            )
          )
        }
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPrimary}
          onChange={(e) =>
            setIsPrimary(
              e.target.checked
            )
          }
        />
        Primary Skill
      </label>

      <div className="flex gap-3">
        <Button
          onClick={
            handleAddSkill
          }
          disabled={
            addSkillMutation.isPending
          }
        >
          Add Skill
        </Button>

        <Button
          variant="outline"
          onClick={
            handleSuggestSkills
          }
          disabled={
            suggestMutation.isPending
          }
        >
          Suggest Skills
        </Button>
      </div>
    </div>
  );
}