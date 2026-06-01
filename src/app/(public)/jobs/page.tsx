"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import PageContainer from "@/components/shared/layout/page-container";
import PageHeader from "@/components/shared/layout/page-header";
import LoadingCard from "@/components/shared/feedback/loading-card";
import EmptyState from "@/components/shared/feedback/empty-state";
import JobCard from "@/components/shared/data-display/job-card";

import JobsSearchBar from "@/modules/public/components/jobs-search-bar";
import { useJobs } from "@/modules/public/hooks/use-jobs";

export default function PublicJobsPage() {
  return (
    <PageContainer>
      <div className="py-10">
        <PageHeader
          title="Find Jobs"
          description="Browse opportunities from verified employers."
        />

        <Suspense
          fallback={
            <div className="mt-8 space-y-6">
              <LoadingCard />
              <LoadingCard />
            </div>
          }
        >
          <SearchAndResults />
        </Suspense>
      </div>
    </PageContainer>
  );
}

function SearchAndResults() {
  const searchParams = useSearchParams();

  const filters = {
    q: searchParams.get("q") ?? undefined,
    city:
      searchParams.get("city") ?? undefined,
    type:
      searchParams.get("type") ?? undefined,
  };

  const { data, isLoading } = useJobs(filters);

  return (
    <>
      <JobsSearchBar />

      <div className="mt-8 space-y-6">
        {isLoading && (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        )}

        {!isLoading &&
          data?.jobs?.map((job: any) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))}

        {!isLoading &&
          (!data?.jobs ||
            data.jobs.length === 0) && (
            <EmptyState
              title="No jobs found"
              description="Try adjusting your search filters."
            />
          )}
      </div>
    </>
  );
}
