import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/types/job";

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  const locationText = [
    job.location?.city,
    job.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Link href={`/jobs/${job._id}`}>
      <Card className="hover:shadow-md transition cursor-pointer">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold">
            {job.title}
          </h3>

          <p className="text-slate-600 mt-2">
            {job.companyName || job.employerName || "Employer"}
          </p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {locationText || "Location not specified"}
            </div>

            {job.location?.workMode && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {job.location.workMode}
              </div>
            )}
          </div>

          {job.salary && (
            <p className="mt-4 font-medium">
              {job.salary}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
