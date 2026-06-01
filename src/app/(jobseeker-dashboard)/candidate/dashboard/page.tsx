"use client";

import { useJobseekerMetrics } from "@/modules/candidate/hooks/use-account";

export default function DashboardPage() {
  const { data, isLoading } =
    useJobseekerMetrics();

  if (isLoading) {
    return (
      <div className="p-8">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="bg-white border rounded-2xl p-8">
        <h1 className="text-4xl font-bold">
          Welcome back,{" "}
          {data?.name ||
            "User"}
        </h1>

        <p className="text-slate-500 mt-4">
          Manage your job
          applications and
          profile.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-2xl p-8">
          <div className="text-slate-500">
            Applied Jobs
          </div>

          <div className="text-5xl font-bold mt-4">
            {data?.appliedJobCount ||
              0}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-8">
          <div className="text-slate-500">
            Saved Jobs
          </div>

          <div className="text-5xl font-bold mt-4">
            {data?.savedJobCount ||
              0}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-8">
          <div className="text-slate-500">
            Job Alerts
          </div>

          <div className="text-5xl font-bold mt-4">
            {data?.jobAlertCount ||
              0}
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-8">
        <h2 className="text-3xl font-bold">
          Recent Activity
        </h2>

        <p className="text-slate-500 mt-4">
          Metrics connected
          successfully.
        </p>
      </div>
    </div>
  );
}