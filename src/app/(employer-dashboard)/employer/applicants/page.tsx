"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  useEmployerJobs,
  useJobApplicants,
  useUpdateApplicantStatus,
} from "@/modules/employer/hooks/use-employer";

import { Button } from "@/components/ui/button";

import apiClient from "@/lib/api/client";

export default function EmployerApplicantsPage() {
  const { data: jobsData } =
    useEmployerJobs();

  const [selectedJobId, setSelectedJobId] =
    useState<string>("");

  const {
    data: applicantsData,
    refetch,
  } = useJobApplicants(
    selectedJobId || undefined
  );

  const updateMutation =
    useUpdateApplicantStatus();

  const jobs =
    jobsData?.jobs || [];

  const applicants =
    applicantsData?.applications ||
    [];

  async function handleStatus(
    applicationId: string,
    status: string
  ) {
    if (!selectedJobId)
      return;

    try {
      await updateMutation.mutateAsync(
        {
          jobId:
            selectedJobId,
          applicationId,
          status,
        }
      );

      await refetch();

      toast.success(
        `Candidate marked ${status}`
      );
    } catch (error) {
      console.error(error);
      toast.error("Status update failed");
    }
  }

  async function downloadResume(
    userId?: string
  ) {
    if (!userId) {
      toast.error("Resume unavailable");
      return;
    }

    try {
      // Goes through Next.js /api/ proxy → backend /cv/download.
      // Cookies handle auth automatically (withCredentials).
      const response =
        await apiClient.get(
          "/cv/download",
          {
            params: { userId },
            responseType: "blob",
          }
        );

      const url =
        window.URL.createObjectURL(
          response.data
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;
      link.download =
        "candidate-resume.pdf";

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        url
      );
    } catch (error) {
      console.error(error);

      toast.error("Resume download failed");
    }
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Applicants
      </h1>

      <div>
        <select
          value={
            selectedJobId
          }
          onChange={(e) =>
            setSelectedJobId(
              e.target.value
            )
          }
          className="border rounded-lg p-3 min-w-[350px]"
        >
          <option value="">
            Select Job
          </option>

          {jobs.map(
            (job: any) => (
              <option
                key={job._id}
                value={
                  job._id
                }
              >
                {
                  job.jobTitle
                    ?.name
                }
              </option>
            )
          )}
        </select>
      </div>

      <div className="space-y-4">
        {applicants.length ===
        0 ? (
          <div className="bg-white border rounded-2xl p-6">
            No applicants found
          </div>
        ) : (
          applicants.map(
            (
              app: any
            ) => (
              <div
                key={app._id}
                className="bg-white border rounded-2xl p-6"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">
                    {app
                      .candidateId
                      ?.name ||
                      "Anonymous Candidate"}
                  </h2>

                  <p className="text-slate-600">
                    {app
                      .candidateId
                      ?.email ||
                      "No email"}
                  </p>

                  <p className="text-slate-600">
                    {app
                      .candidateId
                      ?.location
                      ?.city || ""}
                    {" "}
                    {app
                      .candidateId
                      ?.location
                      ?.country || ""}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {app.status}
                  </p>

                  <p>
                    <strong>Seen:</strong>{" "}
                    {app.employerSeen
                      ? "Yes"
                      : "No"}
                  </p>
                </div>

                <div className="flex gap-2 mt-6 flex-wrap">
                  <Button
                    onClick={() =>
                      handleStatus(
                        app._id,
                        "Shortlisted"
                      )
                    }
                  >
                    Shortlist
                  </Button>

                  <Button
                    onClick={() =>
                      handleStatus(
                        app._id,
                        "Hired"
                      )
                    }
                  >
                    Hire
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      handleStatus(
                        app._id,
                        "Rejected"
                      )
                    }
                  >
                    Reject
                  </Button>

                  {app
                    .candidateId
                    ?._id && (
                    <Button
                      variant="secondary"
                      onClick={() =>
                        downloadResume(
                          app
                            .candidateId
                            ._id
                        )
                      }
                    >
                      Resume
                    </Button>
                  )}
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}