"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  useEmployerJobs,
  useEmployerJobDetails,
  useUpdateEmployerJobStatus,
} from "@/modules/employer/hooks/use-employer";

import { Button } from "@/components/ui/button";

export default function EmployerJobsPage() {
  const { data, refetch } =
    useEmployerJobs();

  const updateMutation =
    useUpdateEmployerJobStatus();

  const [selectedJobId, setSelectedJobId] =
    useState<string | null>(null);

  const {
    data: detailsData,
  } = useEmployerJobDetails(
    selectedJobId || undefined
  );

  const jobs =
    data?.jobs || [];

  const job =
    detailsData?.job;

  async function handleStatusUpdate(
    jobId: string,
    status:
      | "active"
      | "closed"
      | "deleted"
  ) {
    try {
      await updateMutation.mutateAsync({
        jobId,
        status,
      });

      await refetch();

      toast.success(
        `Job ${status} successfully`
      );
    } catch {
      toast.error("Failed to update job");
    }
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Manage Jobs
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-4">
          {jobs.map((job: any) => (
            <div
              key={job._id}
              className="bg-white border rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold">
                {job.jobTitle?.name}
              </h2>

              <p className="text-slate-500 mt-2">
                {job.jobCategory} • {job.jobType}
              </p>

              <p className="text-slate-500 mt-2">
                Status: {job.status}
              </p>

              <div className="flex gap-2 mt-6 flex-wrap">
                <Button
                  onClick={() =>
                    setSelectedJobId(job._id)
                  }
                >
                  View
                </Button>

                {job.status ===
                "active" ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleStatusUpdate(
                        job._id,
                        "closed"
                      )
                    }
                  >
                    Close
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleStatusUpdate(
                        job._id,
                        "active"
                      )
                    }
                  >
                    Reopen
                  </Button>
                )}

                {job.status !==
                  "deleted" && (
                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleStatusUpdate(
                        job._id,
                        "deleted"
                      )
                    }
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="bg-white border rounded-2xl p-6">
          {!job ? (
            <p className="text-slate-500">
              Select a job to view details
            </p>
          ) : (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold">
                {job.jobTitle?.name}
              </h2>

              <p>
                <strong>Category:</strong>{" "}
                {job.jobCategory}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {job.jobType}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {job.status}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {job.location?.city},{" "}
                {job.location?.country}
              </p>

              <p>
                <strong>Work Mode:</strong>{" "}
                {job.location?.workMode}
              </p>

              <p>
                <strong>Salary:</strong>{" "}
                {job.offeredSalary?.currency}
                {job.offeredSalary?.min} -
                {
                  job.offeredSalary?.max
                }{" "}
                {job.offeredSalary?.type}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {
                  job.experience?.minYears
                }
                -
                {
                  job.experience?.maxYears
                }{" "}
                years
              </p>

              <div>
                <strong>Description:</strong>
                <p className="mt-2 text-slate-600">
                  {job.jobDescription}
                </p>
              </div>

              <div>
                <strong>Skills:</strong>
                <div className="flex gap-2 flex-wrap mt-2">
                  {job.skills?.map(
                    (
                      skill: any,
                      idx: number
                    ) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-slate-100 text-sm"
                      >
                        {skill.name}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div>
                <strong>Applicants:</strong>{" "}
                {
                  detailsData?.applicantCount
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}