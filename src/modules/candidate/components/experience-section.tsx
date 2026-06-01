"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useAddExperience,
} from "@/modules/candidate/hooks/profile/use-experience";

import {
  useJobTitles,
} from "@/modules/candidate/hooks/profile/use-skills";

interface ExperienceItem {
  _id?: string;
  title: string;
  company: string;
  from: string;
  to?: string | null;
  currentlyWorking: boolean;
  description: string;
}

interface Props {
  experience: ExperienceItem[];
}

export default function ExperienceSection({
  experience,
}: Props) {
  const addMutation =
    useAddExperience();

  const {
    data: jobTitlesData,
  } = useJobTitles();

  const jobTitles =
    jobTitlesData?.jobtitles || [];

  const [form, setForm] =
    useState({
      title: "",
      company: "",
      from: "",
      to: "",
      currentlyWorking: false,
      description: "",
    });

  function updateField(
    key: string,
    value: string | boolean
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleAdd() {
    try {
      await addMutation.mutateAsync({
        title: form.title,
        company: form.company,
        from: form.from,
        to:
          form.currentlyWorking
            ? null
            : form.to,
        currentlyWorking:
          form.currentlyWorking,
        description:
          form.description,
      });

      alert("Experience added");

      window.location.reload();
    } catch {
      alert(
        "Failed to add experience"
      );
    }
  }

  return (
    <div className="bg-white border rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-semibold">
        Experience
      </h2>

      {/* Existing */}
      {experience.length > 0 && (
        <div className="space-y-4">
          {experience.map((item: any) => (
            <div
              key={item._id}
              className="border rounded-xl p-4"
            >
              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-slate-600">
                {item.company}
              </p>

              <p className="mt-2 text-slate-700">
                {item.description}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                {new Date(
                  item.from
                ).toLocaleDateString()}
                {" - "}
                {item.currentlyWorking
                  ? "Present"
                  : item.to
                  ? new Date(
                      item.to
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      <div className="space-y-4">
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={form.title}
          onChange={(e) =>
            updateField(
              "title",
              e.target.value
            )
          }
        >
          <option value="">
            Select Job Title
          </option>

          {jobTitles.map(
            (
              item: {
                _id: string;
                name: string;
              }
            ) => (
              <option
                key={item._id}
                value={item.name}
              >
                {item.name}
              </option>
            )
          )}
        </select>

        <Input
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            updateField(
              "company",
              e.target.value
            )
          }
        />

        <Input
          type="date"
          value={form.from}
          onChange={(e) =>
            updateField(
              "from",
              e.target.value
            )
          }
        />

        {!form.currentlyWorking && (
          <Input
            type="date"
            value={form.to}
            onChange={(e) =>
              updateField(
                "to",
                e.target.value
              )
            }
          />
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={
              form.currentlyWorking
            }
            onChange={(e) =>
              updateField(
                "currentlyWorking",
                e.target.checked
              )
            }
          />
          Currently Working
        </label>

        <textarea
          className="w-full border rounded-lg px-3 py-2 min-h-32"
          placeholder="Description"
          value={
            form.description
          }
          onChange={(e) =>
            updateField(
              "description",
              e.target.value
            )
          }
        />

        <Button
          onClick={handleAdd}
          disabled={
            addMutation.isPending
          }
        >
          {addMutation.isPending
            ? "Adding..."
            : "Add Experience"}
        </Button>
      </div>
    </div>
  );
}