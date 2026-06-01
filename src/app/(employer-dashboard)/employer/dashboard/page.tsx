"use client";

import { useEmployerMetrics } from "@/modules/employer/hooks/use-employer";

export default function EmployerDashboardPage() {
  const { data, isLoading } =
    useEmployerMetrics();

  if (isLoading) {
    return (
      <div className="p-8">
        Loading employer dashboard...
      </div>
    );
  }

  const metrics =
    data?.data;

  return (
    <div className="p-8 space-y-8">
      <div className="bg-white border rounded-2xl p-8">
        <h1 className="text-4xl font-bold">
          Welcome back,{" "}
          {metrics?.name ||
            "Employer"}
        </h1>

        <p className="text-slate-500 mt-4">
          Manage your jobs and applicants.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <div className="bg-white border rounded-2xl p-6">
          <div className="text-sm text-slate-500">
            Total Jobs
          </div>

          <div className="text-4xl font-bold mt-3">
            {metrics?.totalJobs ||
              0}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <div className="text-sm text-slate-500">
            Active Jobs
          </div>

          <div className="text-4xl font-bold mt-3">
            {metrics?.activeJobs ||
              0}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <div className="text-sm text-slate-500">
            Inactive Jobs
          </div>

          <div className="text-4xl font-bold mt-3">
            {metrics?.inactiveJobs ||
              0}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <div className="text-sm text-slate-500">
            Pending Approval
          </div>

          <div className="text-4xl font-bold mt-3">
            {metrics?.pendingApproval ||
              0}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <div className="text-sm text-slate-500">
            Applicants
          </div>

          <div className="text-4xl font-bold mt-3">
            {metrics?.applicantCount ||
              0}
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-8">
        <h2 className="text-2xl font-bold">
          Recent Posting
        </h2>

        <p className="mt-4 text-slate-500">
          Most recent job posted:
          {" "}
          {metrics?.mostRecentPostedDate
            ? new Date(
                metrics.mostRecentPostedDate
              ).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
}