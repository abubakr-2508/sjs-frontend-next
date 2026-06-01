"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAddEducation } from "@/modules/candidate/hooks/profile/use-education";

interface EducationItem {
  _id?: string;
  course: string;
  institution: string;
  startDate: string;
  endDate?: string | null;
  currentlyPursuing: boolean;
}

interface Props {
  education: EducationItem[];
}

export default function EducationSection({
  education,
}: Props) {
  const addMutation =
    useAddEducation();

  const [form, setForm] =
    useState({
      course: "",
      institution: "",
      startDate: "",
      endDate: "",
      currentlyPursuing: false,
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
        course: form.course,
        institution:
          form.institution,
        startDate:
          form.startDate,
        endDate:
          form.currentlyPursuing
            ? null
            : form.endDate,
        currentlyPursuing:
          form.currentlyPursuing,
      });

      toast.success("Education added");

      window.location.reload();
    } catch {
      toast.error("Failed to add education");
    }
  }

  return (
    <div className="bg-white border rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-semibold">
        Education
      </h2>

      {/* Existing */}
      {education.length > 0 && (
        <div className="space-y-4">
          {education.map((item: any) => (
            <div
              key={item._id}
              className="border rounded-xl p-4"
            >
              <h3 className="font-semibold">
                {item.course}
              </h3>

              <p className="text-slate-600">
                {item.institution}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                {new Date(
                  item.startDate
                ).toLocaleDateString()}
                {" - "}
                {item.currentlyPursuing
                  ? "Present"
                  : item.endDate
                  ? new Date(
                      item.endDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      <div className="space-y-4">
        <Input
          placeholder="Course"
          value={form.course}
          onChange={(e) =>
            updateField(
              "course",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Institution"
          value={form.institution}
          onChange={(e) =>
            updateField(
              "institution",
              e.target.value
            )
          }
        />

        <Input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            updateField(
              "startDate",
              e.target.value
            )
          }
        />

        {!form.currentlyPursuing && (
          <Input
            type="date"
            value={form.endDate}
            onChange={(e) =>
              updateField(
                "endDate",
                e.target.value
              )
            }
          />
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={
              form.currentlyPursuing
            }
            onChange={(e) =>
              updateField(
                "currentlyPursuing",
                e.target.checked
              )
            }
          />
          Currently Pursuing
        </label>

        <Button
          onClick={handleAdd}
          disabled={
            addMutation.isPending
          }
        >
          {addMutation.isPending
            ? "Adding..."
            : "Add Education"}
        </Button>
      </div>
    </div>
  );
}