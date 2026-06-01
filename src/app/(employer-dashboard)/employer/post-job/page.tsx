"use client";

import { useState } from "react";

import {
  useJobTitles,
  useIndustries,
  useCountries,
  useCities,
  useSkills,
  useSuggestSkills,
  useCreateEmployerJob,
} from "@/modules/employer/hooks/use-employer";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/auth-store";

export default function EmployerPostJobPage() {
  const user = useAuthStore((s) => s.user);

  const { data: titlesData } =
    useJobTitles();

  const { data: industriesData } =
    useIndustries();

  const { data: countriesData } =
    useCountries();

  const { data: skillsData } =
    useSkills();

  const suggestMutation =
    useSuggestSkills();

  const createMutation =
    useCreateEmployerJob();

  const [country, setCountry] =
    useState("India");

  const { data: citiesData } =
    useCities(country);

  const [form, setForm] =
    useState({
      jobTitle: "",
      industry: "",
      jobCategory: "Technical",
      jobType: "Full-time",
      jobDescription: "",
      qualification: "",
      vacancies: 1,
      gender: "Any",
      employmentStatus:
        "Permanent",
      country: "India",
      city: "",
      workMode: "On-Site",
      salaryMin: 0,
      salaryMax: 0,
      salaryType: "Monthly",
      careerLevel:
        "Entry-Level",
      minYears: 0,
      maxYears: 1,
      experienceNote: "",
      deadline: "",
      selectedSkills: [] as string[],
      benefits: "",
      responsibilities: "",
    });

  function updateField(
    key: string,
    value: any
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSuggestSkills() {
    if (!form.jobTitle)
      return;

    const selectedTitle =
      titlesData?.jobtitles?.find(
        (t: any) =>
          t._id ===
          form.jobTitle
      );

    if (!selectedTitle)
      return;

    const result =
      await suggestMutation.mutateAsync(
        selectedTitle.name
      );

    updateField(
      "selectedSkills",
      result.data.map(
        (s: any) => s.id
      )
    );
  }

  async function handleSubmit() {
    try {
      if (!user?._id) {
        alert(
          "Please log in to post a job."
        );
        return;
      }

      const payload = {
        user_id: user._id,
        // TODO (issues-fix pass): fetch active subscription plan via a
        // dedicated API instead of reading user.plan, which only holds
        // the currently-selected plan ID.
        plan_id:
          user.plan || "",
        jobTitle:
          form.jobTitle,
        customJobTitle: "",
        industry:
          form.industry,
        jobCategory:
          form.jobCategory,
        jobType:
          form.jobType,
        jobDescription:
          form.jobDescription,
        offeredSalary: {
          min:
            form.salaryMin,
          max:
            form.salaryMax,
          type:
            form.salaryType,
          currency: "$",
        },
        experience: {
          careerLevel:
            form.careerLevel,
          minYears:
            form.minYears,
          maxYears:
            form.maxYears,
          note:
            form.experienceNote,
        },
        location: {
          country:
            form.country,
          city: form.city,
          workMode:
            form.workMode,
        },
        gender:
          form.gender,
        qualification:
          form.qualification,
        applicationDeadlineDate:
          form.deadline,
        specialisms: [],
        skills:
          form.selectedSkills,
        customSkills: [],
        languagesRequired: [
          "English",
        ],
        benefits:
          form.benefits
            .split(",")
            .filter(Boolean),
        keyResponsibilities:
          form.responsibilities
            .split(",")
            .filter(Boolean),
        vacancies:
          form.vacancies,
        employmentStatus:
          form.employmentStatus,
        jobTypeLabel:
          "free",
        postedDate:
          new Date().toISOString(),
        updatedDate:
          new Date().toISOString(),
      };

      await createMutation.mutateAsync(
        payload
      );

      alert(
        "Job created successfully"
      );
    } catch (err) {
      console.error(err);
      alert(
        "Job creation failed"
      );
    }
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Post New Job
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <select
          value={
            form.jobTitle
          }
          onChange={(e) =>
            updateField(
              "jobTitle",
              e.target.value
            )
          }
        >
          <option value="">
            Select Job Title
          </option>
          {titlesData?.jobtitles?.map(
            (item: any) => (
              <option
                key={item._id}
                value={
                  item._id
                }
              >
                {item.name}
              </option>
            )
          )}
        </select>

        <select
          value={
            form.industry
          }
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
                value={
                  item._id
                }
              >
                {item.name}
              </option>
            )
          )}
        </select>

        <input
          placeholder="Job Description"
          value={
            form.jobDescription
          }
          onChange={(e) =>
            updateField(
              "jobDescription",
              e.target.value
            )
          }
        />

        <input
          placeholder="Qualification"
          value={
            form.qualification
          }
          onChange={(e) =>
            updateField(
              "qualification",
              e.target.value
            )
          }
        />

        <select
          value={country}
          onChange={(e) => {
            setCountry(
              e.target.value
            );

            updateField(
              "country",
              e.target.value
            );
          }}
        >
          {countriesData?.countries?.map(
            (item: any) => (
              <option
                key={
                  item.name
                }
              >
                {item.name}
              </option>
            )
          )}
        </select>

        <select
          value={form.city}
          onChange={(e) =>
            updateField(
              "city",
              e.target.value
            )
          }
        >
          <option value="">
            Select City
          </option>

          {citiesData?.cities?.map(
            (
              city: string
            ) => (
              <option
                key={city}
              >
                {city}
              </option>
            )
          )}
        </select>

        <Button
          onClick={
            handleSuggestSkills
          }
        >
          Suggest Skills
        </Button>

        <select
          multiple
          value={
            form.selectedSkills
          }
          onChange={(e) =>
            updateField(
              "selectedSkills",
              Array.from(
                e.target.selectedOptions
              ).map(
                (
                  option
                ) =>
                  option.value
              )
            )
          }
        >
          {skillsData?.map(
            (skill: any) => (
              <option
                key={
                  skill._id
                }
                value={
                  skill._id
                }
              >
                {skill.name}
              </option>
            )
          )}
        </select>

        <input
          type="date"
          onChange={(e) =>
            updateField(
              "deadline",
              e.target.value
            )
          }
        />

        <Button
          onClick={
            handleSubmit
          }
        >
          Create Job
        </Button>
      </div>
    </div>
  );
}