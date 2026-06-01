"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  useEmployerCandidateSearch,
  useInviteCandidate,
  useDownloadCandidateResume,
} from "@/modules/employer/hooks/use-employer-candidates";

import { useEmployerJobs } from "@/modules/employer/hooks/use-employer";

export default function EmployerCandidatePoolPage() {
  const [jobTitle, setJobTitle] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [selectedJobId, setSelectedJobId] =
    useState("");

  const {
    data,
    isLoading,
  } = useEmployerCandidateSearch({
    page,
    limit: 8,
    currentJobTitle: jobTitle,
    skills,
  });

  const { data: jobsData } =
    useEmployerJobs();

  const inviteMutation =
    useInviteCandidate();

  const resumeMutation =
    useDownloadCandidateResume();

  const candidates =
    data?.data || [];

  const jobs =
    jobsData?.jobs || [];

  async function handleInvite(
    candidateId: string
  ) {
    if (!selectedJobId) {
      alert(
        "Select a job first"
      );
      return;
    }

    try {
      const result =
        await inviteMutation.mutateAsync(
          {
            jobId:
              selectedJobId,
            candidateId,
          }
        );

      alert(
        result.message ||
          "Invite sent"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Invite failed"
      );
    }
  }

  async function handleDownload(
    userId: string
  ) {
    try {
      const blob =
        await resumeMutation.mutateAsync(
          userId
        );

      const url =
        window.URL.createObjectURL(
          blob
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

      alert(
        "Resume download failed"
      );
    }
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Candidate Pool
      </h1>

      {/* FILTERS */}
      <div className="bg-white border rounded-2xl p-6 grid md:grid-cols-3 gap-4">
        <input
          value={jobTitle}
          onChange={(e) =>
            setJobTitle(
              e.target.value
            )
          }
          placeholder="Search by job title"
          className="border rounded-xl px-4 py-3"
        />

        <input
          value={skills}
          onChange={(e) =>
            setSkills(
              e.target.value
            )
          }
          placeholder="Skills (React,Node.js)"
          className="border rounded-xl px-4 py-3"
        />

        <select
          value={selectedJobId}
          onChange={(e) =>
            setSelectedJobId(
              e.target.value
            )
          }
          className="border rounded-xl px-4 py-3"
        >
          <option value="">
            Select job for invite
          </option>

          {jobs.map(
            (job: any) => (
              <option
                key={job._id}
                value={job._id}
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

      {/* RESULTS */}
      {isLoading ? (
        <div>
          Loading candidates...
        </div>
      ) : candidates.length ===
        0 ? (
        <div>
          No candidates found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {candidates.map(
            (
              candidate: any
            ) => (
              <div
                key={
                  candidate._id
                }
                className="bg-white border rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      candidate.image ||
                      "https://via.placeholder.com/80"
                    }
                    alt="candidate"
                    className="w-20 h-20 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="text-xl font-bold">
                      {candidate.name ||
                        "Candidate"}
                    </h3>

                    <p className="text-slate-600">
                      {candidate.currentJobTitle ||
                        "No title"}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-slate-600">
                  {candidate.email}
                </div>

                <div className="flex flex-wrap gap-2">
                  {candidate.skills?.map(
                    (
                      skill: any,
                      index: number
                    ) => (
                      <span
                        key={
                          index
                        }
                        className="px-3 py-1 bg-slate-100 rounded-full text-sm"
                      >
                        {typeof skill ===
                        "string"
                          ? skill
                          : skill.name}
                      </span>
                    )
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    Location:{" "}
                    {candidate.location
                      ?.city ||
                      "N/A"}
                  </div>

                  <div>
                    Experience:{" "}
                    {candidate.experience ||
                      "N/A"}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() =>
                      handleDownload(
                        candidate._id
                      )
                    }
                  >
                    Download CV
                  </Button>

                  <Button
                    onClick={() =>
                      handleInvite(
                        candidate._id
                      )
                    }
                  >
                    Send Invite
                  </Button>

                  <Button
                    variant="outline"
                    disabled
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex gap-4">
        <Button
          disabled={
            page === 1
          }
          onClick={() =>
            setPage(
              (prev) =>
                prev - 1
            )
          }
        >
          Previous
        </Button>

        <Button
          onClick={() =>
            setPage(
              (prev) =>
                prev + 1
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}