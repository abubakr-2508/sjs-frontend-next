"use client";

import { useState } from "react";

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

/**
 * Outer component handles the loading state. Once `profile` exists,
 * the inner `ProfileBasicsForm` mounts and initializes its own form
 * state directly from props — no useEffect+setState ping-pong.
 *
 * `key={profile._id}` defensively remounts the form if the user's
 * profile is swapped (e.g., logout+login under a different account
 * without a full page reload).
 */
export default function ProfilePage() {
  const { data, isLoading } = useProfile();

  const profile = data?.data;

  if (isLoading) {
    return (
      <div className="p-8">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <ProfileBasicsForm
        key={profile._id}
        profile={profile}
      />

      <ResumeSection
        hasResume={!!profile.resume}
      />

      <EducationSection
        education={
          profile.education || []
        }
      />

      <ExperienceSection
        experience={
          profile.experience || []
        }
      />

      <SkillsSection />
    </div>
  );
}

function ProfileBasicsForm({
  profile,
}: {
  profile: any;
}) {
  const updateMutation =
    useUpdateProfile();

  const [form, setForm] = useState({
    name: profile.name || "",
    email: profile.email || "",
    mobile: profile.mobile || "",
    country:
      profile.location?.country || "",
    city: profile.location?.city || "",
    pincode:
      profile.location?.pincode || "",
  });

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

  return (
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
  );
}
