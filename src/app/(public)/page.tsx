import { Button } from "@/components/ui/button";

import PageContainer from "@/components/shared/layout/page-container";

export default function HomePage() {
  return (
    <div>
      <section className="py-24">
        <PageContainer>
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium">
              Trusted by thousands of job seekers
            </span>

            <h1 className="mt-8 text-5xl font-bold tracking-tight leading-tight">
              Find your next opportunity with confidence.
            </h1>

            <p className="mt-6 text-xl text-slate-600 leading-relaxed">
              Search jobs, connect with employers, build AI-powered CVs and manage your career journey in one platform.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Button size="lg">
                Find Jobs
              </Button>

              <Button
                size="lg"
                variant="outline"
              >
                Post a Job
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="border-t py-20 bg-slate-50">
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border p-8">
              <h3 className="text-2xl font-bold">
                AI CV Builder
              </h3>

              <p className="text-slate-600 mt-4">
                Generate professional CVs using AI-powered tools.
              </p>
            </div>

            <div className="bg-white rounded-2xl border p-8">
              <h3 className="text-2xl font-bold">
                Smart Job Matching
              </h3>

              <p className="text-slate-600 mt-4">
                Discover relevant opportunities faster.
              </p>
            </div>

            <div className="bg-white rounded-2xl border p-8">
              <h3 className="text-2xl font-bold">
                Employer Dashboard
              </h3>

              <p className="text-slate-600 mt-4">
                Manage jobs, applicants and interviews efficiently.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
