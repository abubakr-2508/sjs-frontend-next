"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ResumeSection from "@/modules/candidate/components/resume-section";
import EducationSection from "@/modules/candidate/components/education-section";
import ExperienceSection from "@/modules/candidate/components/experience-section";
import SkillsSection from "@/modules/candidate/components/skills-section";

import {
  useProfile,
  useUpdateProfile,
} from "@/modules/candidate/hooks/use-profile";

export default function ProfilePage() {
  const { data, isLoading } =
    useProfile();

  const updateMutation =
    useUpdateProfile();

  const profile =
    data?.data;

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      mobile: "",
      country: "",
      city: "",
      pincode: "",
    });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        mobile: profile.mobile || "",
        country:
          profile.location?.country || "",
        city:
          profile.location?.city || "",
        pincode:
          profile.location?.pincode || "",
      });
    }
  }, [profile]);

  function updateField(
    key: string,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSave() {
    try {
      await updateMutation.mutateAsync({
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        location: {
          country: form.country,
          city: form.city,
          pincode: form.pincode,
        },
      });

      alert(
        "Profile updated successfully"
      );
    } catch {
      alert(
        "Failed to update profile"
      );
    }
  }

  if (isLoading) {
    return (
      <div className="p-8">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div className="bg-white border rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            updateField(
              "name",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            updateField(
              "email",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Mobile"
          value={form.mobile}
          onChange={(e) =>
            updateField(
              "mobile",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Country"
          value={form.country}
          onChange={(e) =>
            updateField(
              "country",
              e.target.value
            )
          }
        />

        <Input
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            updateField(
              "city",
              e.target.value
            )
          }
        />

        <Input
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) =>
            updateField(
              "pincode",
              e.target.value
            )
          }
        />

        <Button
          onClick={handleSave}
          disabled={
            updateMutation.isPending
          }
        >
          {updateMutation.isPending
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </div>

      <ResumeSection
        hasResume={
          !!profile?.resume
        }
      />

      <EducationSection
        education={
          profile?.education || []
        }
      />

      <ExperienceSection
        experience={
          profile?.experience || []
        }
      />

      <SkillsSection />
    </div>
  );
}