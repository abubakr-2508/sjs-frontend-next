"use client";

import EmptyState from "@/components/shared/feedback/empty-state";
import LoadingCard from "@/components/shared/feedback/loading-card";

import SavedJobCard from "@/modules/candidate/components/saved-job-card";
import { useSavedJobs } from "@/modules/candidate/hooks/use-saved-jobs";

export default function SavedJobsPage() {
  const {
    data,
    isLoading,
  } = useSavedJobs();

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  const jobs = data?.data || [];

  if (!jobs.length) {
    return (
      <div className="p-8">
        <EmptyState
          title="No saved jobs"
          description="Saved jobs will appear here."
        />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Saved Jobs
        </h1>

        <p className="mt-2 text-slate-500">
          Jobs you bookmarked for later.
        </p>
      </div>

      {jobs.map((job) => (
        <SavedJobCard
          key={job._id}
          job={job}
        />
      ))}
    </div>
  );
}