"use client";

import { useParams } from "next/navigation";
import {
  MapPin,
  Briefcase,
  Calendar,
  GraduationCap,
  BadgeDollarSign,
} from "lucide-react";

import PageContainer from "@/components/shared/layout/page-container";
import LoadingCard from "@/components/shared/feedback/loading-card";
import EmptyState from "@/components/shared/feedback/empty-state";

import { Button } from "@/components/ui/button";

import { useJobDetails } from "@/modules/public/hooks/use-job-details";
import { useApplyJob } from "@/modules/public/hooks/use-apply-job";

export default function JobDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data, isLoading } =
    useJobDetails(id || "");

  const applyMutation =
    useApplyJob();

  if (isLoading) {
    return (
      <PageContainer>
        <div className="py-10">
          <LoadingCard />
        </div>
      </PageContainer>
    );
  }

  const job = data?.job;

  if (!job) {
    return (
      <PageContainer>
        <div className="py-10">
          <EmptyState
            title="Job not found"
            description="This job may have been removed."
          />
        </div>
      </PageContainer>
    );
  }

  const locationText = [
    job.location?.city,
    job.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const salaryText = job.offeredSalary
    ? `${job.offeredSalary.currency}${job.offeredSalary.min} - ${job.offeredSalary.max} ${job.offeredSalary.type}`
    : "Salary not disclosed";

  const skills =
    job.skills?.map(
      (skill: { name: string }) =>
        skill.name
    ) || [];

  async function handleApply() {
    if (!id) return;

    try {
      await applyMutation.mutateAsync(id);
      alert("Successfully Applied!");
    } catch {
      alert(
        "Application failed or already applied."
      );
    }
  }

  return (
    <PageContainer>
      <div className="py-10">
        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold">
                {job.jobTitle?.name}
              </h1>

              <p className="mt-3 text-xl text-slate-600">
                {job.userId?.companyName ||
                  "Employer"}
              </p>
            </div>

            <Button
              onClick={handleApply}
              disabled={
                applyMutation.isPending
              }
            >
              {applyMutation.isPending
                ? "Applying..."
                : "Apply Now"}
            </Button>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 mt-6 text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {locationText ||
                "Location unavailable"}
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              {job.jobType ||
                "Not specified"}
            </div>

            <div className="flex items-center gap-2">
              <BadgeDollarSign className="w-5 h-5" />
              {salaryText}
            </div>

            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              {job.qualification ||
                "Not specified"}
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Apply before{" "}
              {new Date(
                job.applicationDeadlineDate
              ).toLocaleDateString()}
            </div>
          </div>

          {/* Description */}
          <div className="mt-10 border-t pt-8">
            <h2 className="text-2xl font-semibold">
              Job Description
            </h2>

            <p className="mt-4 leading-8 text-slate-700 whitespace-pre-line">
              {job.jobDescription}
            </p>
          </div>

          {/* Responsibilities */}
          {job.keyResponsibilities
            ?.length > 0 && (
            <div className="mt-10 border-t pt-8">
              <h2 className="text-2xl font-semibold">
                Key Responsibilities
              </h2>

              <ul className="mt-4 space-y-3 list-disc pl-6 text-slate-700">
                {job.keyResponsibilities.map(
                  (
                    item: string,
                    index: number
                  ) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mt-10 border-t pt-8">
              <h2 className="text-2xl font-semibold">
                Required Skills
              </h2>

              <div className="mt-4 flex flex-wrap gap-3">
                {skills.map(
                  (
                    skill: string,
                    index: number
                  ) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-slate-100 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
