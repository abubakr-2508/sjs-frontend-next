"use client";

import EmptyState from "@/components/shared/feedback/empty-state";
import LoadingCard from "@/components/shared/feedback/loading-card";

import AppliedJobCard from "@/modules/candidate/components/applied-job-card";
import { useAppliedJobs } from "@/modules/candidate/hooks/use-applied-jobs";

export default function AppliedJobsPage() {
  const {
    data,
    isLoading,
  } = useAppliedJobs();

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  const jobs =
    data?.appliedJobs || [];

  if (!jobs.length) {
    return (
      <div className="p-8">
        <EmptyState
          title="No applied jobs"
          description="Jobs you apply to will appear here."
        />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Applied Jobs
        </h1>

        <p className="mt-2 text-slate-500">
          Track all your submitted applications.
        </p>
      </div>

      {jobs.map((job: any) => (
        <AppliedJobCard
          key={job._id}
          job={job}
        />
      ))}
    </div>
  );
}