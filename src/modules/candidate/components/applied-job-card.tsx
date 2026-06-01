"use client";

import { Card, CardContent } from "@/components/ui/card";

import type { AppliedJob } from "@/types/applied-jobs";

interface Props {
  job: AppliedJob;
}

export default function AppliedJobCard({
  job,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">
              {job.jobId.jobTitle.name}
            </h3>

            <p className="mt-2 text-slate-600">
              {job.jobId.jobType}
            </p>

            <p className="mt-4 text-slate-500 line-clamp-3">
              {job.jobId.jobDescription}
            </p>
          </div>

          <div className="text-right">
            <span className="inline-block px-4 py-2 rounded-full bg-slate-100 text-sm font-medium">
              {job.status}
            </span>

            <p className="mt-3 text-sm text-slate-500">
              {job.employerSeen
                ? "Seen by employer"
                : "Pending review"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}