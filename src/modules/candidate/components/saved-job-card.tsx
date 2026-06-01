"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase } from "lucide-react";

import type { SavedJob } from "@/types/saved-jobs";

interface Props {
  job: SavedJob;
}

export default function SavedJobCard({
  job,
}: Props) {
  const locationText = [
    job.location?.city,
    job.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold">
          {job.jobTitle.name}
        </h3>

        <div className="flex flex-wrap gap-6 mt-4 text-slate-500">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            {job.jobType}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {locationText || "Location unavailable"}
          </div>
        </div>

        <p className="mt-4 text-slate-600 line-clamp-3">
          {job.jobDescription}
        </p>
      </CardContent>
    </Card>
  );
}