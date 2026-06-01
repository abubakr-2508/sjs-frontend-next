"use client";

import { useState } from "react";

import {
  useEmployerProfile,
  useUpdateEmployerProfile,
  useIndustries,
} from "@/modules/employer/hooks/use-employer";
import { Button } from "@/components/ui/button";

/**
 * Outer component handles the loading state. The inner
 * `EmployerProfileForm` receives `profile` as a prop and initializes
 * its state directly — no useEffect+setState pattern.
 */
export default function EmployerProfilePage() {
  const { data, isLoading } =
    useEmployerProfile();

  const profile = data?.data;

  if (isLoading) {
    return (
      <div className="p-8">
        Loading...
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
    <EmployerProfileForm
      key={profile._id}
      profile={profile}
    />
  );
}

function EmployerProfileForm({
  profile,
}: {
  profile: any;
}) {
  const { data: industriesData } =
    useIndustries();

  const updateMutation =
    useUpdateEmployerProfile();

  const [form, setForm] = useState({
    name: profile.name || "",
    email: profile.email || "",
    mobile: profile.mobile || "",

    companyName:
      profile.companyName || "",
    companyWebsite:
      profile.companyWebsite || "",
    companyDescription:
      profile.companyDescription || "",
    companyType:
      profile.companyType || "",
    organizationSize:
      profile.organizationSize || "",
    establishmentYear:
      profile.establishmentYear || "",
    industry:
      profile.industry?._id || "",

    contactPerson: {
      name:
        profile.contactPerson?.name ||
        "",
      designation:
        profile.contactPerson
          ?.designation || "",
      email:
        profile.contactPerson?.email ||
        "",
      phone:
        profile.contactPerson?.phone ||
        "",
      whatsapp:
        profile.contactPerson
          ?.whatsapp || "",
      linkedinProfile:
        profile.contactPerson
          ?.linkedinProfile || "",
    },

    companyAddress: {
      addressLine1:
        profile.companyAddress
          ?.addressLine1 || "",
      addressLine2:
        profile.companyAddress
          ?.addressLine2 || "",
      city:
        profile.companyAddress?.city ||
        "",
      state:
        profile.companyAddress?.state ||
        "",
      country:
        profile.companyAddress
          ?.country || "",
      pincode:
        profile.companyAddress
          ?.pincode || "",
    },

    gstNumber: profile.gstNumber || "",
    panNumber: profile.panNumber || "",
    cinNumber: profile.cinNumber || "",

    socialLinks: {
      linkedin:
        profile.socialLinks?.linkedin ||
        "",
      facebook:
        profile.socialLinks?.facebook ||
        "",
      twitter:
        profile.socialLinks?.twitter ||
        "",
      instagram:
        profile.socialLinks
          ?.instagram || "",
      github:
        profile.socialLinks?.github ||
        "",
      glassdoor:
        profile.socialLinks
          ?.glassdoor || "",
    },
  });

  function updateField(
    key: string,
    value: any
  ) {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateNested(
    parent: string,
    key: string,
    value: any
  ) {
    setForm((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));
  }

  async function saveProfile() {
    try {
      await updateMutation.mutateAsync(
        form
      );

      alert(
        "Profile updated successfully"
      );
    } catch (error) {
      console.error(error);
      alert(
        "Profile update failed"
      );
    }
  }

  function getInitials() {
    if (form.companyName) {
      return form.companyName
        .split(" ")
        .slice(0, 2)
        .map(
          (w: string) => w[0]
        )
        .join("")
        .toUpperCase();
    }

    return "CO";
  }

  function handleLogoUpload() {
    alert(
      "Logo upload endpoint not yet available"
    );
  }

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">
        Employer Profile
      </h1>

      <div className="flex items-center gap-6 bg-white border rounded-2xl p-6">
        <div className="w-24 h-24 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">
          {getInitials()}
        </div>

        <div>
          <h2 className="text-xl font-bold">
            {form.companyName}
          </h2>

          <p className="text-slate-500">
            Logo placeholder
          </p>

          <Button
            className="mt-3"
            onClick={
              handleLogoUpload
            }
          >
            Change Logo
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">
          Personal Profile
        </h2>

        <input
          className="w-full border p-3 rounded-lg"
          value={form.name}
          placeholder="Name"
          onChange={(e) =>
            updateField(
              "name",
              e.target.value
            )
          }
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={form.email}
          placeholder="Email"
          onChange={(e) =>
            updateField(
              "email",
              e.target.value
            )
          }
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={form.mobile}
          placeholder="Mobile"
          onChange={(e) =>
            updateField(
              "mobile",
              e.target.value
            )
          }
        />
      </div>

      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">
          Company Profile
        </h2>

        <input
          className="w-full border p-3 rounded-lg"
          value={form.companyName}
          placeholder="Company Name"
          onChange={(e) =>
            updateField(
              "companyName",
              e.target.value
            )
          }
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={form.companyWebsite}
          placeholder="Website"
          onChange={(e) =>
            updateField(
              "companyWebsite",
              e.target.value
            )
          }
        />

        <textarea
          className="w-full border p-3 rounded-lg"
          rows={6}
          value={form.companyDescription}
          placeholder="Description"
          onChange={(e) =>
            updateField(
              "companyDescription",
              e.target.value
            )
          }
        />

        <select
          className="w-full border p-3 rounded-lg"
          value={form.industry}
          onChange={(e) =>
            updateField(
              "industry",
              e.target.value
            )
          }
        >
          <option value="">
            Select Industry
          </option>

          {industriesData?.industries?.map(
            (item: any) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            )
          )}
        </select>

        <input
          className="w-full border p-3 rounded-lg"
          value={form.companyType}
          placeholder="Company Type"
          onChange={(e) =>
            updateField(
              "companyType",
              e.target.value
            )
          }
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={form.organizationSize}
          placeholder="Organization Size"
          onChange={(e) =>
            updateField(
              "organizationSize",
              e.target.value
            )
          }
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={form.establishmentYear}
          placeholder="Establishment Year"
          onChange={(e) =>
            updateField(
              "establishmentYear",
              e.target.value
            )
          }
        />
      </div>

      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">
          Contact & Location
        </h2>

        <input
          className="w-full border p-3 rounded-lg"
          value={
            form.contactPerson.name
          }
          placeholder="Contact Name"
          onChange={(e) =>
            updateNested(
              "contactPerson",
              "name",
              e.target.value
            )
          }
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={
            form.contactPerson
              .designation
          }
          placeholder="Designation"
          onChange={(e) =>
            updateNested(
              "contactPerson",
              "designation",
              e.target.value
            )
          }
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={
            form.companyAddress
              .addressLine1
          }
          placeholder="Address Line 1"
          onChange={(e) =>
            updateNested(
              "companyAddress",
              "addressLine1",
              e.target.value
            )
          }
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={
            form.companyAddress.city
          }
          placeholder="City"
          onChange={(e) =>
            updateNested(
              "companyAddress",
              "city",
              e.target.value
            )
          }
        />
      </div>

      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">
          Social & Legal
        </h2>

        <input
          className="w-full border p-3 rounded-lg"
          value={form.gstNumber}
          placeholder="GST"
          onChange={(e) =>
            updateField(
              "gstNumber",
              e.target.value
            )
          }
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={form.panNumber}
          placeholder="PAN"
          onChange={(e) =>
            updateField(
              "panNumber",
              e.target.value
            )
          }
        />

        <input
          className="w-full border p-3 rounded-lg"
          value={
            form.socialLinks.linkedin
          }
          placeholder="LinkedIn"
          onChange={(e) =>
            updateNested(
              "socialLinks",
              "linkedin",
              e.target.value
            )
          }
        />
      </div>

      <Button
        size="lg"
        onClick={saveProfile}
      >
        Save Profile
      </Button>
    </div>
  );
}
